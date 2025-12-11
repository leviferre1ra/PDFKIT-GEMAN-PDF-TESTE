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
        "Horário de início/Start Time ", 
        { rowSpan: 2, text: "Terra/Land ( )" },
        { rowSpan: 2, text: "Mar/Sea  ( )" },
      ],

       [
        "Data de término/End Date ",
        "Horário de término/End Time ", 
      ],

      [
      { colSpan: 4, text: "Empresa prestadora do serviço:" },
      ],
      
      [
      { colSpan: 3, text: "Razão social: ______" },
      "CNPJ: ______",
      ],

      [
      { colSpan: 2, text: "Nome do contato: ______" },
      "Telefone para contato: ______",
      "Email para contato: ______",
      ],
   
      [
        { colSpan: 4, text: "MTR Relacionado: ______" },
      ]
    ]
  },
  { hideHeader: true }
);

doc.moveDown(2);

await doc.table(
  {
    headers: ["", "", "", "", ""], // número de colunas
    columnStyles: ["*", "*", "*", "*","*"], // estilos das colunas
    data: [
      [
      { colSpan: 5, text: "Tipo e quantidade de resíduos coletados:" },
      ],

      [
        "Classe/Class",
        "Unidade/Unit (kg, m3, l)",
        "Quantidade/Amount",
        { colSpan: 2, text: "Observações (embalagem, armazenamento temporário, etc.)" },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],

      [
        ".",
        ".",
        ".",
        { colSpan: 2, text: "." },
      ],
    ]
  },
    { hideHeader: true }
);


doc.moveDown(2);

await doc.table(
  {
    headers: ["", "", "", ""],
    columnStyles: [200, "*", "*", "*"],
    data: [
      [
        { colSpan: 4, text: "Destinação de Resíduos/Waste Disposal" },
      ],

      [
        { colSpan: 2, text: "Razão social: ______" },
        "Incrição estaual: ______",
        "CNPJ: ______",
      ],

      [
        { colSpan: 2, text: "Licença IBAMA ou OEMA: ______" },
        { colSpan: 2, text: "Data de vencimento: ______" },
      ],
     
      [
        { colSpan: 2, text: "Endereço: ______" },
        "Município/UF: ______",
        "CEP: ______",
      ],

      [
        { colSpan: 2, text: "Email para contato: ______" },
        { colSpan: 2, text: "Telefone para contato: ______" },
      ],

      [
        { colSpan: 2, text: "Responsável técnico: ______" },
        { colSpan: 2, text: "Registro profissional: ______" },
      ],
    ],
  },
  {
    hideHeader: true, 
  }
);

doc.moveDown(2);

const assinaturas = 'RESPONSÁVEL PELA EMPRESA COLETORA \n\nNOME: __________________________________________________\n\nCPF: __________________________________________________\n\n\nREPRESENTANTE DA EMBARCAÇÃO OU DO AGENTE DE NAVEGAÇÃO\n\nASSINATURA: ____________________________________________\n\n\nRESPONSÁVEL PELA UNIDADE CONTROLADORA\n\nNOME: __________________________________________________\n\nCPF: __________________________________________________';

doc.fontSize(7).text(assinaturas, 30);
doc.end();

console.log("PDF gerado com sucesso!");
