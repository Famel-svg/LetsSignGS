
  document.addEventListener("DOMContentLoaded", () => {
    // Copiar chave de autenticação
    const btnCopy = document.querySelector(".copy-btn");
    btnCopy.addEventListener("click", () => {
      const key = document.querySelector(".auth-key").value;
      navigator.clipboard.writeText(key).then(() => alert("Chave copiada!"));
    });

    // Auto-avanço inputs de verificação
    const inputs = document.querySelectorAll(".verify-inputs input");
    const btnConfirm = document.querySelector(".btn-confirm");

    const checkAllFilled = () => {
      const allFilled = Array.from(inputs).every(input => input.value.trim().length === 1);
      btnConfirm.disabled = !allFilled;
    };

    inputs.forEach((input, idx) => {
      input.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;

        if (value && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }

        checkAllFilled();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && idx > 0) {
          inputs[idx - 1].focus();
        }
      });

      input.addEventListener("paste", (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, '');
        pasteData.split('').forEach((char, i) => {
          if (idx + i < inputs.length) {
            inputs[idx + i].value = char;
          }
        });
        const nextIndex = Math.min(idx + pasteData.length, inputs.length - 1);
        inputs[nextIndex].focus();
        checkAllFilled();
      });
    });

    // Botão de confirmar (simulado)
    btnConfirm.addEventListener("click", () => {
      alert("2FA configurada com sucesso!");
      const modalEl = document.getElementById("modal2FA");
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    });

    // Inicialmente desabilita botão
    btnConfirm.disabled = true;
  });


