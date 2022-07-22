export const eraiResponse = {
  words: [
    {
      kanji: "偉い",
      reading: { kana: "えらい" },
      senses: [
        {
          glosses: [
            "great",
            "excellent",
            "admirable",
            "remarkable",
            "distinguished",
            "important",
            "celebrated",
            "famous",
            "eminent"
          ]
        }
      ]
    }
  ]
};

export default async function mockFetch(url: any) {
  switch (url) {
    case "https://jotoba.de/api/search/words": {
      return {
        ok: true,
        status: 200,
        json: async () => eraiResponse
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
