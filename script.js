const button = document.getElementById("buton");
const url = "https://api.exchangerate.host";

button.addEventListener("click", function (event) {
  const rateValue = $("#rate").val();
  const firstValue = $("#firstvalue").val();
  $.ajax({
    url: `${url}/convert?to=TRY&from=${rateValue}&amount=${firstValue}`,
    method: "GET",
  }).then((data) => {
    $("#result").val(data.result);
  });
}); // refactor edilecek

const CURS = [
  {
    title: "USD",
    description: "Amerikan Doları",
  },
  {
    title: "EUR",
    description: "Avrupa Para Birimi",
  },
  {
    title: "JPY",
    description: "Japon Yeni",
  },
  {
    title: "GBP",
    description: "İngiliz Sterlini",
  },
  {
    title: "DKK",
    description: "Danimarka Kronu",
  },
  {
    title: "NOK",
    description: "Norveç Kronu",
  },
];

const generateJson = () => {
  CURS.map((item) => {
    $(".selectcurrency").append(
      `<option value="${item.title}">${item.title}</option>`
    );

    $.ajax({
      url: `${url}/latest?base=${item.title}`,
      method: "GET",
    }).then((res) => {
      $("#cardlist").append(`
        <div class="col-md-6 col-12 row forcur-border position-relative">
        <div class="col-2 flag">
          <img src="img/${item.title}.png" width="43px" />
        </div>
        <div class="col doviz-ismi">
          <p class="doviz-baslik">${item.title}</p>
          <p class="doviz-tr">${item.description}</p>
        </div>
        <div class="col doviz-satir">
          <p class="deger-baslik">ALIŞ</p>
          <p class="deger">${res.rates["TRY"]}</p>
        </div>
        <div class="col doviz-satir">
          <p class="deger-baslik" usd>SATIŞ</p>
          <p class="deger">${res.rates["TRY"]}</p>
        </div>
      </div>
    `);
    });
  });
};
window.onload = () => {
  generateJson();
};
