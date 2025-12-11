import fs from "fs"
import PDFDocument from "pdfkit"
import sqlite3 from "sqlite3";

const doc = new PDFDocument({size: 'A4'})

const db = new sqlite3.Database("./nabor.db");

function gerarPDF(dados) {
  const assinaturas = 'RESPONSÁVEL PELA EMPRESA COLETORA \nNOME: __________________________________________________\nCPF: __________________________________________________\n\nREPRESENTANTE DA EMBARCAÇÃO OU DO AGENTE DE NAVEGAÇÃO\nASSINATURA: ____________________________________________\n\nRESPONSÁVEL PELA UNIDADE CONTROLADORA\nNOME: ____________________________________________\nCPF: __________________________________________________'

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("testeUsuarioDados.pdf"));

  doc.fontSize(8).text('CERTIFICADO DE RETIRADA DE RESÍDUOS DE EMBARCAÇÃO - CRRE', 40, 40, { align: "center" });
  doc.moveDown();
  doc.fontSize(7).text('CRRE nº: ___                                                                                                                                                                                     Data de Emissão: ___/___/_____');
  doc.fontSize(7).text('Instalação portuária/Port Facility: _______________');
  doc.moveDown();
  doc.fontSize(7).text('Nome da Embarcação/Vessel Name: _______________ Nº IMO: _______________');
  doc.fontSize(7).text('Nacionalidade/Nationality: _______________                  Agente Marítimo ou Agente protetor/Ship Agent: _______________');
  
  doc.fontSize(7).text(assinaturas, 40, 450);
  doc.end();
}

db.get("SELECT * FROM users WHERE id = 1", (err, row) => {
  if (err) throw err;
  gerarPDF(row);
}); 
