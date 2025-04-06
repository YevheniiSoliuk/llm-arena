type Entity = {
  entity_group: string;
  score: number;
  word: string;
  start: number;
  end: number;
};

export function formatEntitiesInText(text: string, entities: Entity[]) {
  entities.sort((a, b) => b.start - a.start);

  let formattedText = text;

  entities.forEach(entity => {
    const originalPart = formattedText.substring(entity.start, entity.end);
    const formattedEntity = `[${originalPart}](${entity.entity_group})`;
    formattedText =
      formattedText.substring(0, entity.start) +
      formattedEntity +
      formattedText.substring(entity.end);
  });

  return `NER:${formattedText}`;
}