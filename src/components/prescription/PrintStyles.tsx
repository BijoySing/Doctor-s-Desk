import React from 'react'

export default function PrintStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-area, .print-area * {
          visibility: visible;
        }
        .print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 20mm;
        }
        .no-print {
          display: none !important;
        }
        @page {
          size: A4;
          margin: 0;
        }
        .print-area {
          page-break-after: avoid;
        }
        .print-area h1 {
          font-size: 18pt !important;
        }
        .print-area h2 {
          font-size: 16pt !important;
        }
        .print-area .text-sm {
          font-size: 10pt !important;
        }
        .print-area .text-xs {
          font-size: 8pt !important;
        }
        .print-area .p-4 {
          padding: 6px 0 !important;
        }
        .print-area .p-6 {
          padding: 10px 0 !important;
        }
        .print-area .mb-4 {
          margin-bottom: 6px !important;
        }
        .print-area .space-y-4 > * + * {
          margin-top: 12px !important;
        }
        .print-area .border-l-4 {
          border-left: none !important;
        }
        .print-area .bg-white {
          background: transparent !important;
        }
        .print-only {
          display: block !important;
        }
        .print-area .border-t-2 {
          border-top: 1px solid #000 !important;
          margin-top: 15px !important;
          padding-top: 10px !important;
        }
      }
    `}} />
  )
}
