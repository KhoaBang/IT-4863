interface ElasticsearchResponse {
    _index: string; // Index name
    _id?: string;    // Document ID, now optional
    _score?: number; // Relevance score, now optional
    _source: {
      tenchude: string;  // Title or subject
      tendemuc: string;  // Sub-title or section
      tenchuong: string; // Chapter title
      tendieu: string;   // Article title or number
      noidung: string;   // Content of the document
    };
  };

export interface dieu{
    tenchude: string;  // Title or subject
      tendemuc: string;  // Sub-title or section
      tenchuong: string; // Chapter title
      tendieu: string;   // Article title or number
      noidung: string;   // Content of the document
}

  export default ElasticsearchResponse
  