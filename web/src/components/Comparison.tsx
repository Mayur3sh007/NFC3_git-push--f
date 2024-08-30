"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PoliticianData {
  name: string;
  party: string;
  age: number;
  yearsInOffice: number;
  keyPolicies: string[];
  // Add other fields as necessary
}

const PoliticianDataFetcher: React.FC = () => {
  const [politician1, setPolitician1] = useState<PoliticianData | null>(null);
  const [politician2, setPolitician2] = useState<PoliticianData | null>(null);
  const [summary1, setSummary1] = useState<string>('');
  const [summary2, setSummary2] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchData = async (name: string, setPolitician: React.Dispatch<React.SetStateAction<PoliticianData | null>>, setSummary: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      // Fetch scraped data
      const scrapedResponse = await fetch('/get_scraped_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      
      if (!scrapedResponse.ok) {
        throw new Error(`HTTP error! status: ${scrapedResponse.status}`);
      }
      
      const scrapedData = await scrapedResponse.json();
      setPolitician(scrapedData.data);

      // Fetch summary
      const summaryResponse = await fetch('/get_summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      
      if (!summaryResponse.ok) {
        throw new Error(`HTTP error! status: ${summaryResponse.status}`);
      }
      
      const summaryData = await summaryResponse.json();
      setSummary(summaryData.summary);
    } catch (e : any) {
      setError(`Error fetching data: ${e.message}`);
    }
  };

  useEffect(() => {
    fetchData('Akhilesh Yadav', setPolitician1, setSummary1);
    fetchData('Afzal Ansari', setPolitician2, setSummary2);
  }, []);

  const renderPolitician = (politician: PoliticianData | null, summary: string) => {
    if (!politician) return null;
    return (
      <div className='w-full max-w-sm'>
        <Card className="h-full bg-white shadow-lg border border-blue-200">
          <CardHeader className="text-center bg-blue-600 text-white py-4">
            <h2 className="text-2xl font-bold">{politician.name}</h2>
            <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold bg-white text-blue-600 rounded-full">
              {politician.party}
            </span>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-800">Age:</span>
                <span className="text-blue-900">{politician.age}</span>
              </div>
              <hr className="border-t border-blue-100" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-800">Years in Office:</span>
                <span className="text-blue-900">{politician.yearsInOffice}</span>
              </div>
              <hr className="border-t border-blue-100" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Key Policies:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {politician.keyPolicies.map((policy, index) => (
                    <li key={index} className="text-blue-900">{policy}</li>
                  ))}
                </ul>
              </div>
              <hr className="border-t border-blue-100" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Summary:</h3>
                <p className="text-blue-900">{summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8 p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen w-screen">
      {renderPolitician(politician1, summary1)}
      {renderPolitician(politician2, summary2)}
    </div>
  );
};

export default PoliticianDataFetcher;