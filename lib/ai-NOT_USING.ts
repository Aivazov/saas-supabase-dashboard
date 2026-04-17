// lib/ai.ts
// import axios from "axios";

// export async function generateTasks(prompt: string) {
//   try {
//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/gpt2',
//       {inputs: `Create a list of 3 tasks for: ${prompt}`},
//       {
//         headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }
//       }
//     )
//     const text = response.data[0]?.generated_text || '';
//     console.log('text', text);
    
//     return text.split('\n').map((t) => t.trim().filter(Boolean));

//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }