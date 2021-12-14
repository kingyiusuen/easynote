interface Entity {
  id: string;
  [key: string]: unknown;
}

interface NormalizedData {
  [type: string]: Entity;
}

const convertToEntities = (items: Entity[]) => {
  const entities: NormalizedData = {};
  items.forEach((item) => {
    entities[item.id] = item;
  });
  return entities;
};

export default convertToEntities;
