export async function News() {
  try {
    const data = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?format=json"
    );
    const dataJson = await data.json();
    return dataJson;
  } catch (e) {
    console.error(e);
    return null;
  }
}
