import fs from "fs";
import PDFDocument from "pdfkit";
import sqlite3 from "sqlite3";


const db = new sqlite3.Database("./nabor.db");

const doc = new PDFDocument({ margin: 30 });
doc.pipe(fs.createWriteStream("tabela_colspan_rowspan.pdf"));

doc.fontSize(8);
await doc.table(
  {
    headers: ["", "", ""], // número de colunas
    columnStyles: [200, "*", "*"], // estilos das colunas
    data: [
      [
        { colSpan: 3, text: "CERTIFICADO DE RETIRADA DE RESÍDUOS DE EMBARCAÇÃO - CRRE", align: "center"},
      ],

      [
        { colSpan: 2, text: "CRRE nº: ___" },
        "Data de Emissão: ___/___/_____",
      ],
      
       [
        { colSpan: 3, text: "Instalação portuária/Port Facility: _______________" },
      ],
    ],
  },
  {
    hideHeader: true, // para não mostrar o header
    
  }
);

doc.moveDown(2);

await doc.table(
  {
    headers: ["", ""], // número de colunas
    columnStyles: ["*", "*"], // estilos das colunas
    data: [
      ["Nome da Embarcação/Vessel Name: ___________________", "Nº IMO: _________"],
      ["Nacionalidade/Natiolaty: ___________________", "Agente Marítimo ou Agente protetor/Ship Agent: ___________________"],
    ],
  },
  {
    hideHeader: true, // para não mostrar o header
    
  }
);

doc.moveDown(2);

await doc.table(
  {
    headers: ["", "", "", ""],
    columnStyles: ["*", "*", "*", "*"], // estilos das colunas
    data: [

      [
      { colSpan: 2, text: "Trabalho de bordo:" },
      { colSpan: 2, text: "Modalidade de retirada de bordo:" },
      ],

      
      [
        "Data de início/Start Date ",
        "Coluna 2", 
        { rowSpan: 2, text: "Terra/Land ( )" },
        { rowSpan: 2, text: "Mar/Sea  ( )" },
      ],

       [
        "Coluna 1",
        "Coluna 2", 
      ],

      [
      { colSpan: 4, text: "Empresa prestadora do serviço:" },
      ],
      
      [
      { colSpan: 3, text: "Razão social: ________________" },
      "CNPJ: ________________",
      ],

      [
      { colSpan: 2, text: "Nome do contato: ________________" },
      "Telefone para contato: ________________",
      "Email para contato: ________________",
      ],
   
      [
        { colSpan: 4, text: "MTR Relacionado:" },
      ]
    ]
  },
  { hideHeader: true }
);

doc.moveDown(2);


await doc.table(
  {
    headers: ["", "", ""], // 👈 NECESSÁRIO
    columnStyles: [200, "*", "*"],
    data: [
      [
        { colSpan: 2, text: "Header with Colspan = 2" },
        "Header 3",
      ],
      ["Header 1"],
      ["Sample value 1", "Sample value 2", "Sample value 3"],
        
      [
        {
          rowSpan: 3,
          text:
            "rowspan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor",
        },
        "Sample value 2",
        "Sample value 3",
      ],
      ["Sample value 2", "Sample value 3"],
      ["Sample value 2", "Sample value 3"],

      [
        "Sample value 1",
        {
          colSpan: 2,
          rowSpan: 2,
          text: "Both:\nrowspan and colspan\ncan be defined at the same time",
        },
      ],
      ["Sample value 1"],
    ],
  },
  {
    hideHeader: true, // 👈 ESSE É O SEGREDO PARA NÃO APARECER O HEADER
  }
);

doc.moveDown(2);

const assinaturas = 'RESPONSÁVEL PELA EMPRESA COLETORA \nNOME: __________________________________________________\nCPF: __________________________________________________\n\nREPRESENTANTE DA EMBARCAÇÃO OU DO AGENTE DE NAVEGAÇÃO\nASSINATURA: ____________________________________________\n\nRESPONSÁVEL PELA UNIDADE CONTROLADORA\nNOME: __________________________________________________\nCPF: __________________________________________________';

doc.fontSize(7).text(assinaturas, 30);
doc.end();

console.log("PDF gerado com sucesso!");
