from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from groq import Groq
import requests
import urllib.parse
from bs4 import BeautifulSoup
import json
from transformers import pipeline
from collections import defaultdict

os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")

from constants import system_summary_prompt_template

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


api_key = os.environ.get("GROQ_API_KEY")
client = Groq()

def get_candidate_data(candidate_name):
    # Helper function to extract data from tables
    def extract_table_data(table):
        rows = table.find_all("tr")
        if len(rows) > 1:
            headers = [header.text.strip() for header in rows[0].find_all("td")]
            case_data_list = []
            for row in rows[1:]:
                values = [value.text.strip() for value in row.find_all("td")]
                case_data = dict(zip(headers, values))
                case_data_list.append(case_data)
            return case_data_list
        return None

    # Fetch candidate link
    base_url = "https://myneta.info/search_myneta.php"
    query = urllib.parse.quote_plus(candidate_name)
    search_url = f"{base_url}?q={query}"

    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    table = soup.find_all('table')[3]
    if table:
        first_row = table.find('tr', class_=lambda x: x != 'w3-black')
        if first_row:
            link = first_row.find('a')
            if link:
                profile_url = f"https://myneta.info{link['href']}"
            else:
                return {"error": "No profile link found."}
        else:
            return {"error": "No rows found in the table."}
    else:
        return {"error": "No tables found on the page."}

    # Extract cases data
    try:
        profile_response = requests.get(profile_url)
        profile_response.raise_for_status()
        profile_soup = BeautifulSoup(profile_response.content, "html.parser")

        cases = profile_soup.find_all("div", class_="w3-responsive")
        data = {
            "pending_cases": extract_table_data(cases[1]) if len(cases) > 1 else None,
            "convicted_cases": extract_table_data(cases[2]) if len(cases) > 2 else None
        }
    except requests.exceptions.RequestException as e:
        return {"error": f"Network error occurred: {e}"}

    # Extract parliamentary activities data
    try:
        parsed_name = "-".join(candidate_name.lower().split(" "))
        activities_url = f"https://prsindia.org/mptrack/18th-lok-sabha/{parsed_name}"

        activities_response = requests.get(activities_url)
        activities_response.raise_for_status()
        activities_soup = BeautifulSoup(activities_response.content, 'html.parser')

        activity_data = {
            'questions': [],
            'debates': [],
            'bills': []
        }

        # Process the section for questions, debates, and bills
        section_id = 'block-views-mp-related-views-block-2222'
        sections = activities_soup.find_all('section', id=section_id)
        if sections:
            if len(sections) > 0:
                questions_section = sections[0]
                questions_table = questions_section.find('table', class_='views-table')
                if questions_table:
                    for row in questions_table.find('tbody').find_all('tr'):
                        cols = row.find_all('td')
                        date = cols[0].get_text(strip=True)
                        title = cols[1].find('a').get_text(strip=True)
                        link = cols[1].find('a')['href']
                        question_type = cols[2].get_text(strip=True)
                        ministry = cols[3].get_text(strip=True)

                        activity_data['questions'].append({
                            'Date': date,
                            'Title': title,
                            'Link': link,
                            'Type': question_type,
                            'Ministry': ministry
                        })

            if len(sections) > 1:
                bills_section = sections[1]
                bills_table = bills_section.find('table', class_='views-table')
                if bills_table:
                    for row in bills_table.find('tbody').find_all('tr'):
                        cols = row.find_all('td')
                        date = cols[0].get_text(strip=True)
                        title = cols[1].find('a').get_text(strip=True)
                        link = cols[1].find('a')['href']
                        current_status = cols[2].get_text(strip=True)
                        referred_date = cols[3].get_text(strip=True) if len(cols) > 3 else ''

                        activity_data['bills'].append({
                            'Date': date,
                            'Title': title,
                            'Link': link,
                            'Current Status': current_status,
                            'Date - Passage / Withdrawal / Lapsing': referred_date
                        })

        debates_section = activities_soup.find('section', id='block-views-mps-debate-related-views-block')
        if debates_section:
            debates_table = debates_section.find('table', class_='views-table')
            if debates_table:
                for row in debates_table.find('tbody').find_all('tr'):
                    cols = row.find_all('td')
                    date = cols[0].get_text(strip=True)
                    title = cols[1].find('a').get_text(strip=True)
                    link = cols[1].find('a')['href']
                    debate_type = cols[2].get_text(strip=True)

                    activity_data['debates'].append({
                        'Date': date,
                        'Title': title,
                        'Link': link,
                        'Type': debate_type
                    })
            else:
                activity_data['debates'] = []

        # Combine both cases and parliamentary activities data
        return {
            "profile_url": profile_url,
            "cases": data,
            "parliamentary_activities": activity_data
        }
    except requests.exceptions.RequestException as e:
        return {"error": f"Network error occurred: {e}"}
    except Exception as e:
        return {"error": f"An error occurred: {e}"}

def format_detailed_prompt(data):
    print("Data received for formatting prompt:", data)

    pending_cases_summary = "\n".join([
        f"Case {i+1}: FIR No. {case['FIR No.']}, Case No. {case['Case No.']}, Court: {case['Court']}, Charges Framed: {case['Charges Framed']}, Date: {case['Date on which charges were framed']}"
        for i, case in enumerate(data.get('pending_cases', []))
    ]) if data.get('pending_cases') else "No pending cases available."

    convicted_cases_summary = "None" if not data.get('convicted_cases') else "\n".join([
        f"Case {i+1}: {case['Serial No.']}"
        for i, case in enumerate(data['convicted_cases'])
    ]) if data.get('convicted_cases')[0].get('Serial No.') != "---------No Cases--------" else "No convicted cases available."

    questions_summary = "\n".join([
        f"Question {i+1}: Date: {q['Date']}, Title: {q['Title']}, Link: {q.get('Link', 'No link available')}"
        for i, q in enumerate(data.get('questions', []))
    ]) if data.get('questions') else "No questions available."

    # Create a detailed prompt
    prompt = f"""
    Analyze the following data about a politician:

    Pending Cases:
    {pending_cases_summary}

    Convicted Cases:
    {convicted_cases_summary}

    Questions Raised:
    {questions_summary}

    This is a Indian Loksabha politician's data and you to analyze it thoroughly and Provide a detailed analysis covering:
    1. *Main Agenda or Focus Areas*: Based on the questions, what seems to be the main focus or agenda of the politician?
    2. *Criminal Record or Corruption Issues*: Analyze the pending and convicted cases to assess the politician's involvement in criminal activities or corruption.
    3. *Legislative Activity*: How active is the politician in terms of raising questions? What does this say about their legislative engagement?
    4. *Overall Performance*: Summarize the politician's overall performance, including their impact, achievements, and any potential concerns.

    Ensure the analysis is comprehensive and provides detailed insights into the politician's work and integrity.
    """

    print("Generated Prompt:", prompt)
    return prompt

def get_neta_summary(prompt):
  
  completion = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[
        {
            "role": "system",
            "content": system_summary_prompt_template
        },
        {
            "role": "user",
            "content": prompt
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=False,
    response_format={"type": "json_object"},
    stop=None,
  )
    
  return completion.choices[0].message.content




# Define constants for API
NEWS_API_KEY = '55b09a1142c34ebc963021bed7d6d7d6'  # Replace with your actual API key
NEWS_API_URL = 'https://newsapi.org/v2/everything'  # Replace with the actual News API URL
MODEL = 'llama3-groq-70b-8192-tool-use-preview'  # Replace with your model ID

def fetch_news(query, count=5):
    """
    Fetches news articles based on the given query.
    
    Args:
        query (str): The query string for the news search.
        count (int): The number of articles to fetch.

    Returns:
        list: A list of articles or an empty list if the request fails.
    """
    headers = {'X-Api-Key': NEWS_API_KEY}
    params = {
        'q': query,
        'pageSize': count,
        'language': 'en'
    }
    try:
        response = requests.get(NEWS_API_URL, headers=headers, params=params)
        response.raise_for_status()
        return response.json().get('articles', [])
    except requests.RequestException as e:
        print(f"Failed to fetch news: {e}")
        return []

def scrape_news_content(url):
    """
    Scrapes the content of a news article from the given URL.
    
    Args:
        url (str): The URL of the news article.

    Returns:
        str: The combined content of headings, sub-headings, and paragraphs.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract headings and paragraphs
        headings = [h.get_text() for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])]
        paragraphs = [p.get_text() for p in soup.find_all('p')]

        # Combine headings and paragraphs
        content = ' '.join(headings + paragraphs)
        return content
    except requests.RequestException as e:
        print(f"Failed to scrape the page: {e}")
        return ""

def run_conversation(user_prompt, content):
    SYSTEM_PROMPT = (
        "You are an advanced AI assistant specialized in analyzing news content related to political figures. "
        "You are providing this data for a website that's highly focused on analyzing and displaying relevant news that's crucial for the country. "
        "Your task is to take raw news content and provide detailed descriptions of the politician's activities, roles, and how they are portrayed. "
        "Consider the following aspects while analyzing the content: "
        "1. Actions: What specific activities or actions is the politician involved in? "
        "2. Role: How is the politician's role being portrayed in the news? "
        "3. Public Engagement: How is the politician interacting with the public or other political entities? "
        "4. Reputation: What is implied about the politician's reputation through their actions and portrayal? "
        "Your goal is to provide a detailed summary that reflects these aspects based on content from multiple articles."
    )

    TOOL_DESCRIPTION = (
        "This tool is used to analyze news content. Given a collection of news texts, it performs several analyses including: "
        "1. Action Description: Provides a detailed description of the politician's activities and roles. "
        "2. Role Analysis: Summarizes how the politician's role is portrayed in the news. "
        "3. Public Engagement: Analyzes how the politician is engaging with the public or other political entities. "
        "4. Reputation Analysis: Describes the implied reputation of the politician based on the news content. "
        "5. Summary Generation: Provides a comprehensive summary integrating insights from various articles."
    )

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"{user_prompt}\n\nContent to analyze: {content}"}
    ]

    tools = [
        {
            "type": "function",
            "function": {
                "name": "analyze_content",
                "description": TOOL_DESCRIPTION,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "The news content to analyze."
                        }
                    },
                    "required": ["content"]
                }
            }
        }
    ]

    try:
        # Initial API call to get the tool's response
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            tools=tools,
            tool_choice="auto",
            max_tokens=4096
        )
        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

        if tool_calls:
            available_functions = {
                "analyze_content": lambda content: {
                    "actions": "Detailed actions from the content.",
                    "role": "Description of the role.",
                    "public_engagement": "Public engagement insights.",
                    "reputation": "Reputation analysis.",
                    "summary": "Comprehensive summary of the content."
                }
            }
            
            # Process each tool call
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_to_call = available_functions.get(function_name)
                if function_to_call:
                    function_args = json.loads(tool_call.function.arguments)
                    function_response = function_to_call(content=function_args.get("content"))
                    
                    # Append tool response to messages
                    messages.append(
                        {
                            "tool_call_id": tool_call.id,
                            "role": "tool",
                            "name": function_name,
                            "content": json.dumps(function_response)
                        }
                    )
                else:
                    print(f"Function {function_name} not found.")

            try:
                # Second API call to finalize the response
                second_response = client.chat.completions.create(
                    model=MODEL,
                    messages=messages
                )
                second_response_message = second_response.choices[0].message
                content = second_response_message.content.strip()

                # Validate and return the final content
                if content:
                    return json.loads(content)
                else:
                    raise ValueError("The response content is empty or invalid.")
            except Exception as e:
                print(f"Error in second API call: {e}")
                return None
        else:
            return response_message.content.strip()

    except Exception as e:
        print(f"Error in API call: {e}")
        return None

def main(name, query, count=3):
    """
    Main function to fetch, scrape, and analyze news articles.

    Args:
        name (str): The name of the politician.
        query (str): The query string for fetching news.
        count (int): The number of articles to fetch.

    Returns:
        str: The final output in JSON format.
    """
    articles = fetch_news(query, count)
    print(f"Fetched {len(articles)} articles.")
    summaries = []

    for article in articles:
        content = scrape_news_content(article['url'])
        
        prompt = (
            f"Analyze the following news content about {name}, focusing specifically on their personal reputation, role, and public perception. "
            "Consider the following aspects in your analysis: "
            "1. Personal Reputation: How does the news content affect the politician's personal image and credibility? Are there any notable actions, controversies, or achievements that impact their reputation? "
            "2. Role: How is the politician’s role described in the news? Are there any changes or challenges to their role that might affect their effectiveness or influence? "
            "3. Public Perception: What is the overall sentiment towards the politician based on the news content? How might this perception influence their public standing or future career? "
            "Provide a detailed analysis that integrates insights from this article."
        )
        
        # Get summary for each article
        summary = run_conversation(prompt, content)
        summaries.append({
            "url": article['url'],
            "summary": summary
        })

    final_output = {
        "summaries": summaries
    }

    formatted_output = json.dumps(final_output, indent=4)

    return formatted_output


# Initialize the sentiment analysis pipeline
pipe = pipeline('sentiment-analysis')

def truncate_text(text, max_length=512):
    return text[:max_length]

def split_text(text, max_length=512):
    return [text[i:i + max_length] for i in range(0, len(text), max_length)]

def aggregate_results(results):
    aggregated_scores = defaultdict(list)
    for result in results:
        label = result['label']
        score = result['score']
        aggregated_scores[label].append(score)

    average_scores = {label: sum(scores) / len(scores) for label, scores in aggregated_scores.items()}

    total_scores = [score for scores in aggregated_scores.values() for score in scores]
    overall_average_score = sum(total_scores) / len(total_scores) if total_scores else 0

    most_frequent_label = max(aggregated_scores, key=lambda x: len(aggregated_scores[x]))

    return most_frequent_label, overall_average_score

def analyze_articles(articles):
    all_results = []
    global_results = []

    for article in articles:
        text = article['summary']
        print(f"Analyzing article: {article['url']}")

        chunks = split_text(text)
        chunk_results = [pipe(chunk) for chunk in chunks]
        flattened_results = [item for sublist in chunk_results for item in sublist]
        print(f"Chunk results for article: {flattened_results}")

        final_sentiment, final_score = aggregate_results(flattened_results)
        print(f"Final Sentiment for article: {final_sentiment} (Score: {final_score:.4f})")

        all_results.append({
            'url': article['url'],
            'final_sentiment': final_sentiment,
            'final_score': final_score
        })
        
        # Add to global results for overall aggregation
        global_results.extend(flattened_results)

    # Aggregate sentiment results across all articles
    global_sentiment, global_score = aggregate_results(global_results)
    
    # Add global sentiment results to the response
    return {
        'article_results': all_results,
        'global_sentiment': global_sentiment,
        'global_score': global_score
    }


@app.route('/get_summary', methods=['POST'])
def get_summary():
    data = request.json
    name = data.get("name")
    candidate_data = get_candidate_data(name)

    if "error" in candidate_data:
        return jsonify(candidate_data), 400

    prompt = format_detailed_prompt(candidate_data)
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        summary = get_neta_summary(prompt)
        return jsonify({"summary": summary}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_scraped_data', methods=['POST'])
def get_scraped_data():
    data = request.json
    name = data.get("name")
    
    if not name:
        return jsonify({"error": "Name of the Neta is required"}), 400
    
    try:
        data = get_candidate_data(name)
        return jsonify({"data": data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_news_summary', methods=['POST'])
def analyze():
    try:
        data = request.json
        name = data.get('name')
        query = data.get('query')
        count = data.get('count', 3)
        
        if not name or not query:
            return jsonify({"error": "Missing 'name' or 'query' parameter."}), 400

        output = main(name, query, count)
        print(output)
        return jsonify(json.loads(output))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    try:
        input_data = request.json
        
        if not input_data or 'summaries' not in input_data:
            return jsonify({'error': 'Invalid input data'}), 400
        
        articles = input_data['summaries']
        
        # Call the analyze_articles function
        results = analyze_articles(articles)
        
        # Return the results as JSON
        return jsonify(results), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)