const url = 'https://zippiux.com';

let Token = {
  type: 0,
  lexeme: '',
};

let tokens = [];

// Check if a character is alphabetic
function isAlpha(char) {
  return /^[A-Za-z]$/.test(char);
}

// Check if a character is numeric
function isDigit(char) {
  return /^\d$/.test(char);
}

// Check if a character is a symbol
function isSymbol(text) {
  return /^[^\d\w\s]+$/.test(text); // Matches any non-alphanumeric character
}

// Function to fetch HTML content from a URL
async function fetchHTML(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Error fetching HTML:', error);
  }
}

async function lex() {
  try {
    const html = await fetchHTML(url);
    // console.log(html);

    for (let i = 0; i < html.length; i++) {
      if (isAlpha(html[i]) || html[i] == '_' || html[i] == '-') {
        let line = html[i];
        while (isAlpha(html[++i]) || html[i] == '_' || html[i] == '-') {
          line += html[i];
        }
        i--;

        console.log(line);
        tokens.push(0, line);
      } else if (isDigit(html[i])) {
        let number = html[i];
        while (isDigit(html[++i])) {
          number += html[i];
        }
        i--;

        console.log(number);
        tokens.push(1, number);
      } else if (html[i] == '"') {
        let strLit = html[i++];
        do {
          strLit += html[i];
        } while (html[i++] != '"');
        console.log(strLit);
        tokens.push(2, strLit);
      } else if (html[i] == '<') {
        console.log('<');
        tokens.push(3, '<');
      } else if (html[i] == '>') {
        console.log('>');
        tokens.push(4, '>');
      } else {
        // console.log("Error or some shit!");
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

lex();

// "<"(3) + <id>(0) ~ Tag with id <id>

// std::vector<Token> context;

// context.push_back(tokens[i]);
