document.addEventListener("DOMContentLoaded", function () {
    let captchaText = "";

    function validation(inputField) {
        let errorMsg = "";
        let clear = true;

        if (inputField.value === "" || inputField.value == null) {
            errorMsg = "Input field Can Not Be Empty";
            clear = false;
        } else {
            const id = inputField.id;

            switch (id) {
                case "fullname":
                    if (/^[A-Za-z]+$/.test(inputField.value) == false) {
                        errorMsg = "Name should contain only letters";
                        clear = false;
                    }
                    break;
                case "email":
                    if (/\s/g.test(inputField.value)) {
                        errorMsg = "Email should not contain any whitespaces";
                        clear = false;
                    } else if (
                        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(inputField.value) == false
                    ) {
                        errorMsg = "Email is not valid";
                        clear = false;
                    }
                    break;
                case "password":
                    if (inputField.value.length < 8) {
                        errorMsg = "Password should be atleast 8 characters long";
                        clear = false;
                    } else if (inputField.value.length > 30) {
                        errorMsg = "Password length should should not exceed 30 characters";
                        clear = false;
                    }
                    break;
                case "captchaInput":
                    if (inputField.value !== captchaText) {
                        errorMsg = "Invalid captcha";
                        clear = false;
                    }
                    break;
                default:
                    break;
            }
        }

        if (clear) {
            inputField.classList.add("error-solved");
            inputField.classList.remove("input-error");
            inputField.parentElement.querySelector(".error").innerText = "";
        } else {
            inputField.classList.remove("error-solved");
            inputField.classList.add("input-error");
            inputField.parentElement.querySelector(".error").innerText = errorMsg;
        }
    }

    function generateCaptcha() {
        const alphaNums = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ];
        const emptyArr = [];

        for (let i = 1; i <= 6; i++) {
            emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        }

        const captchaCanvas = document.querySelector("#captcha");
        let ctx = captchaCanvas.getContext("2d");

        captchaText = emptyArr.join("");
        ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
        ctx.font = "45px Arial";
        ctx.fillText(captchaText, captchaCanvas.width / 8, captchaCanvas.height / 1.6);
    }
    generateCaptcha();

    document.querySelectorAll("#registration-form .input-validation").forEach(function (e) {
        e.addEventListener("input", function () {
            validation(e);
        });
    });

    document.getElementById("refreshBtn").addEventListener("click", generateCaptcha);

    document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
});
