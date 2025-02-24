type InputType = 'text' | 'number' | 'radio' | 'checkbox' | 'D/A - 0-5' | 'N/A - 0-6';


interface SurveyQuestionInterface {
    question_id: number;
    question_text: string;
    question_type: InputType;
    options?: string[];
    question_group: string;
    program_id: number;
  }

  export default SurveyQuestionInterface;