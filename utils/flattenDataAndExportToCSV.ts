import { InterviewFeedbackResult, Job } from "@/types/feedback";
import { Parser } from "@json2csv/plainjs";

interface Data {
  job: Job;
  feedback: InterviewFeedbackResult;
}

export function flattenDataAndExportToCSV(data: Data): void {
  const flattenedData: any[] = [];

  const jobDetails = {
    jobId: data.job.id,
    jobTitle: data.job.title,
    company: data.job.company,
    location: data.job.location,
    type: data.job.type,
    level: data.job.level,
    description: data.job.description,
    salary: data.job.salary,
    posted: data.job.posted,
    logo: data.job.logo,
    industry: data.job.industry,
    overallRating: data.feedback.interview_summary.overall_rating,
    overallAnalysis: data.feedback.interview_summary.overall_analysis,
    notableStrengths:
      data.feedback.interview_summary.notable_strengths.join("; "),
    areasForImprovement:
      data.feedback.interview_summary.areas_for_improvement.join("; "),
    finalRecommendations:
      data.feedback.final_recommendations.overall_impression,
    practiceFocusAreas:
      data.feedback.final_recommendations.practice_focus_areas.join("; "),
    finalTip: data.feedback.final_recommendations.final_tip,
  };

  flattenedData.push(jobDetails);

  data.feedback.per_question_feedback.forEach((questionFeedback) => {
    const questionDetails = {
      questionId: questionFeedback.question_id,
      question: questionFeedback.question,
      candidateAnswer: questionFeedback.candidate_answer,
      actualAnswer: questionFeedback.actual_answer,
      evaluationScore: questionFeedback.evaluation.score,
      evaluationCoverage: questionFeedback.evaluation.coverage,
      missedPoints: questionFeedback.evaluation.missed_points.join("; "),
      depth: questionFeedback.evaluation.depth,
      recommendation: questionFeedback.recommendation,
    };

    flattenedData.push({ ...jobDetails, ...questionDetails });
  });

  try {
    const fields = [
      { label: "Job ID", value: "jobId" },
      { label: "Job Title", value: "jobTitle" },
      { label: "Company", value: "company" },
      { label: "Location", value: "location" },
      { label: "Type", value: "type" },
      { label: "Level", value: "level" },
      { label: "Description", value: "description" },
      { label: "Salary", value: "salary" },
      { label: "Posted", value: "posted" },
      { label: "Logo", value: "logo" },
      { label: "Industry", value: "industry" },
      { label: "Overall Rating", value: "overallRating" },
      { label: "Overall Analysis", value: "overallAnalysis" },
      { label: "Notable Strengths", value: "notableStrengths" },
      { label: "Areas For Improvement", value: "areasForImprovement" },
      { label: "Final Recommendations", value: "finalRecommendations" },
      { label: "Practice Focus Areas", value: "practiceFocusAreas" },
      { label: "Final Tip", value: "finalTip" },
      { label: "Question ID", value: "questionId" },
      { label: "Question", value: "question" },
      { label: "Candidate Answer", value: "candidateAnswer" },
      { label: "Actual Answer", value: "actualAnswer" },
      { label: "Evaluation Score", value: "evaluationScore" },
      { label: "Evaluation Coverage", value: "evaluationCoverage" },
      { label: "Missed Points", value: "missedPoints" },
      { label: "Depth", value: "depth" },
      { label: "Recommendation", value: "recommendation" },
    ];

    const parser = new Parser({ fields, withBOM: true });
    const csv = parser.parse(flattenedData);

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "feedback.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error(err);
  }
}

// Example usage
// const data: Data = {
//   job: {
//     id: 2,
//     title: "Backend Engineer",
//     company: "ChaiCode",
//     location: "Jaipur, India",
//     type: "Full-time",
//     level: "Senior",
//     description:
//       "Join our backend team to build scalable and resilient systems that power our enterprise applications.",
//     salary: "₹18,00,000 – ₹25,00,000",
//     posted: "2025-05-12",
//     logo: "https://via.placeholder.com/150",
//     industry: "Technology",
//   },
//   feedback: {
//     interview_summary: {
//       overall_rating: 8.5,
//       overall_analysis:
//         "Piyush demonstrates a solid understanding of React concepts and frontend development practices.",
//       notable_strengths: [
//         "Strong grasp of React fundamentals.",
//         "Practical experience with performance optimization techniques.",
//       ],
//       areas_for_improvement: [
//         "Initial hesitation/misunderstanding requiring question repetition.",
//       ],
//     },
//     scorecard: {
//       technical_skills: {
//         score: 8,
//         commentary:
//           "Strong understanding of the virtual DOM and state management techniques.",
//       },
//       problem_solving: {
//         score: 9,
//         commentary: "Excellent explanation of overcoming performance issues.",
//       },
//       communication: {
//         score: 7,
//         commentary: "Clear and concise responses.",
//       },
//       confidence: {
//         score: 8,
//         commentary: "Presented confidently throughout the interview.",
//       },
//     },
//     per_question_feedback: [
//       {
//         question_id: 1,
//         question:
//           "Can you explain the virtual DOM and why it's important in React?",
//         candidate_answer:
//           "Sure. The virtual DOM is a lightweight JavaScript representation of the real DOM.",
//         actual_answer:
//           "The Virtual DOM is a lightweight, in-memory representation of the actual DOM.",
//         evaluation: {
//           score: 7,
//           coverage: "The candidate provided a good basic explanation.",
//           missed_points: [
//             "Detailed explanation of the 'diffing' process",
//             "Quantifiable performance gains.",
//           ],
//           depth: "The answer demonstrates a basic understanding.",
//         },
//         recommendation:
//           "Encourage the candidate to research the 'diffing' algorithm in more detail.",
//       },
//       {
//         question_id: 2,
//         question: "How do you manage state in React applications?",
//         candidate_answer:
//           "I usually use the useState and useReducer hooks for local state management.",
//         actual_answer:
//           "The best approach depends on the complexity and scale of the application.",
//         evaluation: {
//           score: 8,
//           coverage:
//             "The candidate provided a good overview of different state management approaches.",
//           missed_points: ["Specifically mentioning memoization techniques."],
//           depth: "The candidate demonstrated good depth of knowledge.",
//         },
//         recommendation:
//           "While the candidate provided a solid answer, they should delve deeper into performance considerations.",
//       },
//       // Add more questions as needed
//     ],
//     final_recommendations: {
//       practice_focus_areas: [
//         "Review common React.js interview questions.",
//         "Practice answering questions clearly and concisely.",
//       ],
//       overall_impression:
//         "Piyush demonstrates a solid understanding of React fundamentals and best practices.",
//       final_tip:
//         "Before the interview, review and rehearse your answers to common frontend interview questions.",
//     },
//   },
// };

// // Call the function to flatten and export
// flattenDataAndExportToCSV(data);
