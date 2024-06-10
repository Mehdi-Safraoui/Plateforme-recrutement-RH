const fs = require('fs');
const pdfParse = require('pdf-parse');
const textract = require('textract');
const Tesseract = require('tesseract.js');

// Fonction pour extraire le texte d'un fichier PDF
const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

// Fonction pour extraire le texte d'un fichier Word ou d'autres types de documents
const extractTextFromDoc = async (filePath) => {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, (error, text) => {
      if (error) {
        return reject(error);
      }
      resolve(text);
    });
  });
};

// Fonction pour extraire le texte d'une image en utilisant l'OCR
const extractTextFromImage = async (filePath) => {
  const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
  return text;
};

// Fonction principale pour traiter le CV
const processCV = async (filePath) => {
  const fileExtension = filePath.split('.').pop().toLowerCase();
  let text = '';

  try {
    if (fileExtension === 'pdf') {
      text = await extractTextFromPDF(filePath);
    } else if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'txt') {
      text = await extractTextFromDoc(filePath);
    } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      text = await extractTextFromImage(filePath);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error processing CV:', error);
    throw error;
  }

  return text;
};

// Fonction pour calculer le score en fonction des mots-clés
const calculateScoreWithDetails = (text, jobKeywords) => {
  let cvScore = 0;
  const details = {};

  jobKeywords.forEach(({ tag, score }) => {
    const regex = new RegExp(`\\b${tag}\\b`, 'gi');
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    details[tag] = count; // Utilisez le tag comme clé dans l'objet de détails

    // Ajoutez le score si des correspondances sont trouvées
    if (count > 0) {
        cvScore += parseInt(score);
    }
});

return { cvScore, details };
};
module.exports = {
  processCV,
  calculateScoreWithDetails,
};
