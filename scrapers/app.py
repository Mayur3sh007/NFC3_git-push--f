from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from groq import Groq
import requests
import urllib.parse
from bs4 import BeautifulSoup

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
    2. *Criminal Record or Corruption Issues*: Analyze the pending and convicted cases to assess the politician’s involvement in criminal activities or corruption.
    3. *Legislative Activity*: How active is the politician in terms of raising questions? What does this say about their legislative engagement?
    4. *Overall Performance*: Summarize the politician's overall performance, including their impact, achievements, and any potential concerns.

    Ensure the analysis is comprehensive and provides detailed insights into the politician’s work and integrity.
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

@app.route('/get_summary', methods=['GET'])
def get_summary():
    data = request.json
    name = data.get("name")
    print(name)
    candidate_Data = get_candidate_data(name)
    # print(candidate_Data)
    prompt = format_detailed_prompt(candidate_Data)
    print(prompt)
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        summary = get_neta_summary(prompt)
        return jsonify({"summary": summary}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/get_scraped_data', methods=['GET'])
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


if __name__ == '__main__':
    app.run(debug=True)
    