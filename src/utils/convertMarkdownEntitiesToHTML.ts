export function convertMarkdownEntitiesToHTML(text: string) {
  const entityColors = {
    'PER': '#f05f75', // pink for persons
    'I-PER': '#f05f75',
    'B-PER': '#f05f75',
    'LOC': '#3ec753', // green for locations
    'I-LOC': '#3ec753',
    'B-LOC': '#3ec753',
    'ORG': '#3e91c7', // blue for organizations
    'I-ORG': '#3e91c7',
    'B-ORG': '#3e91c7',
    'MISC': '#ff9e00', // orange for miscellaneous entities
    'I-MISC': '#ff9e00',
    'B-MISC': '#ff9e00',
    'O': '#b4b435', // yellow for other entities
  };

  const entityTypeColors = {
    'PER': '#5e0b18', // pink for persons
    'LOC': '#0a5f17', // green for locations
    'ORG': '#225374', // blue for organizations
    'MISC': '#6d480c', // orange for miscellaneous entities
    'O': '#616109', // yellow for other entities
  }

  const entityRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const htmlText = text.replace(entityRegex, (_, entityText: string, entityType: string) => {
    const color = entityColors[entityType as keyof typeof entityColors] || '#b4b435'; // Default yellow if type not found
    const entityTypeColor = entityTypeColors[entityType as keyof typeof entityTypeColors] || '#b4b435'; // Default yellow if type not found
    return `
      <span
        style="
          background-color: ${color};
          padding: 2px;
          padding-left: 6px;
          margin-right: 2px;
          border-radius: 3px;
        "
        title="${entityType}"
      >
        ${entityText}
        <span
          style="
            background-color: ${entityTypeColor};
            padding: 2px;
            border-radius: 2px;
            text-transform: lowercase;
            font-size: 12px;
            font-weight: 600;
            position: relative;
            top: -2px;
          "
          title="${entityType}"
        >${entityType}</span>
      </span>`;
  });

  return htmlText;
}