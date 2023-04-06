import React, { useRef } from 'react';
import htmlToImage from 'html-to-image';

function TableImage() {
  const tableRef = useRef(null);

  const downloadImage = () => {
    htmlToImage.toPng(tableRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'table.png';
        link.href = dataUrl;
        link.click();
      });
  }

  return (
    <div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Użytkownik</th>
            <th>Punkty</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan Kowalski</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Anna Nowak</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
      <button onClick={downloadImage}>Pobierz obrazek</button>
    </div>
  );
}

export default TableImage;
