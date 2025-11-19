const mdToPdf = require("md-to-pdf");
const path = require("path");
const fs = require("fs");

async function convertToPdf() {
  try {
    console.log("Converting markdown files to PDF...\n");

    // Convert PROJECT_DIAGRAMS.md
    console.log("Converting PROJECT_DIAGRAMS.md...");
    const diagrams = await mdToPdf(
      { path: "./PROJECT_DIAGRAMS.md" },
      {
        dest: "./PROJECT_DIAGRAMS.pdf",
        pdf_options: {
          format: "A4",
          margin: {
            top: "20mm",
            right: "20mm",
            bottom: "20mm",
            left: "20mm",
          },
          printBackground: true,
          preferCSSPageSize: true,
        },
        stylesheet: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
          }
          h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            page-break-before: always;
          }
          h1:first-of-type {
            page-break-before: avoid;
          }
          h2 { 
            color: #34495e; 
            border-bottom: 2px solid #95a5a6;
            padding-bottom: 8px;
            margin-top: 30px;
          }
          h3 { 
            color: #7f8c8d; 
            margin-top: 20px;
          }
          code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
          }
          pre {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            overflow-x: auto;
            font-size: 9pt;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            font-size: 10pt;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #3498db;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            color: #555;
            font-style: italic;
          }
          .mermaid {
            background-color: #fff;
            border: 1px solid #e1e4e8;
            border-radius: 6px;
            padding: 16px;
            margin: 20px 0;
          }
        `,
      }
    );

    if (diagrams && diagrams.filename) {
      console.log("✓ PROJECT_DIAGRAMS.pdf created successfully!\n");
    }

    // Convert SYSTEM_SNAPSHOTS.md
    console.log("Converting SYSTEM_SNAPSHOTS.md...");
    const snapshots = await mdToPdf(
      { path: "./SYSTEM_SNAPSHOTS.md" },
      {
        dest: "./SYSTEM_SNAPSHOTS.pdf",
        pdf_options: {
          format: "A4",
          margin: {
            top: "20mm",
            right: "20mm",
            bottom: "20mm",
            left: "20mm",
          },
          printBackground: true,
          preferCSSPageSize: true,
        },
        stylesheet: `
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
          }
          h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            page-break-before: always;
          }
          h1:first-of-type {
            page-break-before: avoid;
          }
          h2 { 
            color: #34495e; 
            border-bottom: 2px solid #95a5a6;
            padding-bottom: 8px;
            margin-top: 30px;
          }
          h3 { 
            color: #7f8c8d; 
            margin-top: 20px;
          }
          code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 9pt;
          }
          pre {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 12px;
            overflow-x: auto;
            font-size: 8pt;
            line-height: 1.4;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            font-size: 10pt;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #3498db;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            color: #555;
            font-style: italic;
          }
        `,
      }
    );

    if (snapshots && snapshots.filename) {
      console.log("✓ SYSTEM_SNAPSHOTS.pdf created successfully!\n");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✓ All PDF files generated successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\nGenerated files:");
    console.log("  📄 PROJECT_DIAGRAMS.pdf");
    console.log("  📄 SYSTEM_SNAPSHOTS.pdf");
    console.log("\n");
  } catch (error) {
    console.error("Error converting to PDF:", error);
    process.exit(1);
  }
}

convertToPdf();
