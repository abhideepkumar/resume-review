const promptText = (raw_text) => {
  const prompt = `
  Extract the following information from the resume text and output a JSON object with the keys:
  {
    "name": <name>,
    "email": <email>,
    "education": {
      "degree": <degree>,
      "branch": <branch>,
      "institution": <institution>,
      "year": <year>
    },
    "experience": {
      "job_title": <job_title>,
      "company": <company>
    },
    "skills": [<skill_1>, <skill_2>, ...],
    "summary": <short summary about the candidate profile>
  }
  If any information is missing, leave the field empty.
  Resume text: ${raw_text}
      `;
  return prompt;
};

export default promptText;
