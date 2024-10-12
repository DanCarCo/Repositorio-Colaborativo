// Función para calcular el módulo de exponenciación
function modExp(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 == 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

// Ejemplo 1: Diffie-Hellman
function calcularClaveCompartida() {
  let g = parseInt(document.getElementById("g").value);
  let p = parseInt(document.getElementById("p").value);
  let a = parseInt(document.getElementById("a").value);
  let b = parseInt(document.getElementById("b").value);

  let Apub = modExp(g, a, p);
  let Bpub = modExp(g, b, p);
  let claveA = modExp(Bpub, a, p);
  let claveB = modExp(Apub, b, p);

  document.getElementById("resultado1").innerHTML = `
                <p>Valor público de A (Apub): ${Apub}</p>
                <p>Valor público de B (Bpub): ${Bpub}</p>
                <p>Clave compartida calculada por A: ${claveA}</p>
                <p>Clave compartida calculada por B: ${claveB}</p>
            `;
}

// Ejemplo 2: Criptografía de Curvas Elípticas (simulación simple)
function calcularPuntoDoble() {
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);
  let a = parseInt(document.getElementById("a2").value);
  let p = parseInt(document.getElementById("p2").value);

  let s = ((3 * Math.pow(x, 2) + a) * modInv(2 * y, p)) % p;
  let x3 = (Math.pow(s, 2) - 2 * x) % p;
  let y3 = (s * (x - x3) - y) % p;

  document.getElementById("resultado2").innerHTML = `
                <p>Nuevo punto P' (2P): (${x3}, ${y3})</p>
            `;
}

function modInv(n, p) {
  let [a, m] = [n % p, p];
  for (let x = 1; x < m; x++) {
    if ((a * x) % m == 1) return x;
  }
}

// Ejemplo 3: Generar un hash SHA-256
async function generarHash() {
  let mensaje = document.getElementById("mensaje").value;
  const encoder = new TextEncoder();
  const data = encoder.encode(mensaje);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  document.getElementById("resultado3").innerHTML = `
                <p>Hash SHA-256 generado: ${hashHex}</p>
            `;
}

async function enviarPregunta() {
  const pregunta = document.getElementById("pregunta").value;

  // Asegúrate de configurar estas variables con tus valores
  const OPENROUTER_API_KEY =
    "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";

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "Eres un experto en criptografía y encriptación. Solo debes responder preguntas relacionadas con criptografía, encriptación y temas técnicos relacionados. Si te hacen preguntas fuera de estos temas, debes responder: 'Lo siento, solo estoy capacitado para responder preguntas relacionadas con encriptación y criptografía.'",
            },
            {
              role: "user",
              content: pregunta,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    const respuestaAPI = data.choices[0].message.content;

    // Mostrar la respuesta en el HTML
    document.getElementById(
      "respuesta"
    ).innerHTML = `<p><strong>Respuesta:</strong> ${respuestaAPI}</p>`;
  } catch (error) {
    document.getElementById(
      "respuesta"
    ).innerHTML = `<p>Hubo un error: ${error.message}</p>`;
  }
}
