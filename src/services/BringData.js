export async function News(url) {
  try {
    const data = await fetch(url);
    const dataJson = await data.json();
    return dataJson;
  } catch (e) {
    console.error(e);
    return null;
  }
}
