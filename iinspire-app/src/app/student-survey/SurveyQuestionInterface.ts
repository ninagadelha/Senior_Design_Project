type InputType = 'D/A - 0-5' | 'N/A - 0-6' | 'SD/SL - 0-4' | 
                  'NC/CC - 0-9' | 'SD/SA - 0-4' | '% / 0-100' | 'Y/N/' | 'Short Answer';


interface SurveyQuestionInterface {
    question_id: number;
    question_text: string;
    question_type: InputType;
    options?: string[];
    question_group: string;
    program_id: number;
  }

  export default SurveyQuestionInterface;