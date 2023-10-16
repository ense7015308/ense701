import React from "react";
import { MyComponent } from "../StarRating";


interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table>
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header.key}
            style={{ width: header.key === "doi" ? "20%" : "auto" }}
            // Set the width of the DOI column to 10%, other columns adjust automatically
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key}>
            {header.key === "rating" ? (
              <MyComponent />
            ) : (
              row[header.key]
            )}
          </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;
