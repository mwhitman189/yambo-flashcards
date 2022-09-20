export const MOCK_DATA = {
  kanji: [
    {
      literal: "偉",
      meanings: ["admirable", "greatness", "remarkable", "conceited", "famous", "excellent"],
      grade: 8,
      stroke_count: 12,
      frequency: 1639,
      jlpt: 3,
      onyomi: ["イ"],
      kunyomi: ["えら.い"],
      chinese: ["wei3"],
      korean_r: ["wi"],
      korean_h: ["위"],
      parts: ["⺅", "口", "韋"],
      radical: "人",
      stroke_frames: "/assets/svg/kanji/偉_frames.svg"
    },
    {
      literal: "人",
      meanings: ["person"],
      grade: 1,
      stroke_count: 2,
      frequency: 5,
      jlpt: 5,
      onyomi: ["ジン", "ニン"],
      kunyomi: ["ひと", "-り", "-と"],
      chinese: ["ren2"],
      korean_r: ["in"],
      korean_h: ["인"],
      parts: ["人"],
      radical: "人",
      stroke_frames: "/assets/svg/kanji/人_frames.svg"
    },
    {
      literal: "目",
      meanings: ["eye", "class", "look", "insight", "experience", "care", "favor"],
      grade: 1,
      stroke_count: 5,
      frequency: 76,
      jlpt: 4,
      onyomi: ["モク", "ボク"],
      kunyomi: ["め", "-め", "ま-"],
      chinese: ["mu4"],
      korean_r: ["mog"],
      korean_h: ["목"],
      parts: ["目"],
      radical: "目",
      stroke_frames: "/assets/svg/kanji/目_frames.svg"
    }
  ],
  words: [
    {
      reading: {
        kana: "えらい",
        kanji: "偉い",
        furigana: "[偉|えら]い"
      },
      common: true,
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
          ],
          pos: [
            {
              Adjective: "Keiyoushi"
            }
          ],
          language: "English"
        },
        {
          glosses: ["very troublesome", "awful", "terrible"],
          pos: [
            {
              Adjective: "Keiyoushi"
            }
          ],
          language: "English",
          misc: "UsuallyWrittenInKana"
        },
        {
          glosses: ["tiring", "tough"],
          pos: [
            {
              Adjective: "Keiyoushi"
            }
          ],
          language: "English",
          misc: "UsuallyWrittenInKana"
        },
        {
          glosses: ["very", "extremely"],
          pos: ["Adverb"],
          language: "English",
          dialect: "Kansai",
          misc: "UsuallyWrittenInKana"
        }
      ],
      audio: "/audio/ogg/偉い【えらい】.ogg",
      pitch: [
        {
          part: "え",
          high: false
        },
        {
          part: "ら",
          high: true
        },
        {
          part: "い",
          high: false
        }
      ]
    },
    {
      reading: {
        kana: "えらいさん",
        kanji: "偉いさん",
        furigana: "[偉|えら]いさん"
      },
      common: false,
      senses: [
        {
          glosses: ["big shot", "higher-ups"],
          pos: [
            {
              Noun: "Normal"
            }
          ],
          language: "English",
          misc: "Colloquialism",
          xref: "お偉方"
        }
      ]
    },
    {
      reading: {
        kana: "えらいこっちゃ",
        kanji: "偉いこっちゃ",
        furigana: "[偉|えら]いこっちゃ"
      },
      common: false,
      senses: [
        {
          glosses: ["what are we going to do?", "uh-oh", "oh crap", "what a mess", "oh brother"],
          pos: ["Expr", "Interjection"],
          language: "English",
          dialect: "Kansai",
          misc: "UsuallyWrittenInKana"
        }
      ]
    },
    {
      reading: {
        kana: "えらいひと",
        kanji: "偉い人",
        furigana: "[偉|えら]い[人|ひと]"
      },
      common: false,
      senses: [
        {
          glosses: ["celebrated personage", "big-wig", "person in a high position"],
          pos: [
            "Expr",
            {
              Noun: "Normal"
            }
          ],
          language: "English"
        }
      ]
    },
    {
      reading: {
        kana: "どえらい",
        kanji: "ど偉い",
        furigana: "ど[偉|えら]い"
      },
      common: false,
      senses: [
        {
          glosses: ["immense", "awesome", "enormous", "terrific"],
          pos: [
            {
              Adjective: "Keiyoushi"
            }
          ],
          language: "English"
        }
      ],
      pitch: [
        {
          part: "ど",
          high: false
        },
        {
          part: "えら",
          high: true
        },
        {
          part: "い",
          high: false
        }
      ]
    },
    {
      reading: {
        kana: "えらいめにあう",
        kanji: "えらい目にあう",
        furigana: "えらい[目|め]にあう"
      },
      common: false,
      senses: [
        {
          glosses: ["to have a terrible time", "to have a hard time"],
          pos: [
            "Expr",
            {
              Verb: {
                Godan: "U"
              }
            }
          ],
          language: "English",
          xref: "目にあう・めにあう"
        }
      ]
    }
  ]
};
