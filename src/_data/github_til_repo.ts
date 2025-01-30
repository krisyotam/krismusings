type TIL = {
  content: string;
  date: string;
  path: string;
  title: string;
};

export const getGitHubTilRepo = async (): Promise<TIL[]> => {
  const response = await fetch(
    'https://raw.githubusercontent.com/krisyotam/til/main/feed.json'
  );

  const body = await response.text();

  let til: TIL[];

  try {
    til = JSON.parse(body) as TIL[];
    til = til.map((item) => ({
      ...item,
      // Ensure the path has the .md extension before removing it
      path: item.path.endsWith('.md') ? item.path.substring(0, item.path.lastIndexOf('.')) : item.path
    }));
  } catch (e) {
    console.error('Error parsing TIL Feed:', e);  // Log the error for better debugging
    throw new Error('Unable to parse TIL Feed', { cause: e });
  }

  return til;
};
