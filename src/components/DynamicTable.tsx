import React, { useState } from "react";
import "./DynamicTable.css";

interface Props {
  data: any;
}

const DynamicTable = ({ data }: Props) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const tdMaxChars = 65;

  const handleRowClick = (key: string) => {
    if (expandedRows.has(key)) {
      expandedRows.delete(key);
    } else {
      expandedRows.add(key);
    }
    setExpandedRows(new Set(expandedRows));
  };

  const trimmedCellString = (str: String) => {
    if (str.length > tdMaxChars) {
      return str.substring(0, tdMaxChars) + "...";
    }
    return str;
  };

  const getExpandableCellValue = (value: any, isExpanded: boolean) => {
    let name = value.name || "-";
    let longNameClass;
    let title;

    if (name.length > tdMaxChars) {
      longNameClass = "long";
      title = value.name;
    }

    return (
      <>
        <span className={longNameClass} title={title}>
          {trimmedCellString(name)}
        </span>
        <span className="rowAction">{isExpanded ? "△" : "▼"}</span>
      </>
    );
  };

  const getRowColor = (level: number) => {
    const maxLevel = 10;
    const hue = 225; // blue
    const saturation = 60;
    const lightness = 70 + (level / maxLevel) * 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const renderRow = (key: string, value: any, level = 0): JSX.Element => {
    const isExpandable = typeof value === "object" && value !== null;
    const isExpanded = expandedRows.has(key);
    const isLong = value.length > tdMaxChars;

    return (
      <>
        <tr
          onClick={() => isExpandable && handleRowClick(key)}
          style={{ backgroundColor: getRowColor(level) }}
        >
          <td>{key}</td>
          <td className={isExpandable ? "expandable" : ""}>
            {isExpandable ? (
              getExpandableCellValue(value, isExpanded)
            ) : (
              <span
                className={isLong ? "long" : ""}
                title={isLong ? value : null}
              >
                {trimmedCellString(value)}
              </span>
            )}
          </td>
        </tr>
        {isExpanded &&
          Object.entries(value).map(([childKey, childValue]) =>
            renderRow(childKey, childValue, level + 1)
          )}
      </>
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => renderRow(key, value))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
