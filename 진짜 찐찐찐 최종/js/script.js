// 메인 문구 슬라이드: 3초마다 옆으로 넘어가요 (푸드페스티벌 슬라이드와 같은 방식)
let i = 0;
function slide() {
  if (i < 2) {
    i++;
  } else {
    i = 0;
  }
  // 문구 1개 = 화면 폭(.hero의 너비)만큼 왼쪽으로 이동
  $(".hero-slides").animate({ marginLeft: -$(".hero").width() * i }, 1000);
}
setInterval(slide, 3000);

// 생활비·절약 페이지 (budget.html)
if ($("#budget-table").length) {
  // 숫자에 쉼표와 "원"을 붙여요. 예) 250000 -> 250,000원
  function won(n) {
    return n.toLocaleString("ko-KR") + "원";
  }

  // 1. 월 생활비를 입력하면 항목별 예산을 계산해요
  function calc() {
    let income = Number($("#income").val()) || 0;
    let sum = 0;

    $(".ratio").each(function () {
      let r = Number($(this).data("r"));
      let money = Math.round((income * r) / 100);
      sum += money;
      $(this)
        .closest("tr")
        .find(".amount")
        .text(income ? won(money) : "-");
    });

    // 2. 합계 금액
    $("#sumAmount").text(income ? won(sum) : "-");
  }

  // 입력할 때마다 다시 계산
  $("#income").on("input", calc);

  // 3. 초기화 버튼
  $("#reset").click(function () {
    $("#income").val("");
    calc();
  });

  // 4. 팁 모두 펼치기 / 접기
  let tipsOpen = false;
  $("#toggleTips").click(function () {
    tipsOpen = !tipsOpen;
    $(".tip").prop("open", tipsOpen);
    $(this).text(tipsOpen ? "모두 접기" : "모두 펼치기");
  });

  calc();
}

// 필수 생활용품 페이지 (items.html): 체크한 내용 저장하기
if ($(".checks").length) {
  const KEY = "jachwi-items"; // 브라우저에 저장할 때 쓰는 이름

  // 1. 저장된 체크 목록을 불러와서 체크해 줘요
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (e) {}

  $(".checks input").each(function () {
    if (saved.indexOf($(this).data("key")) > -1) {
      $(this).prop("checked", true);
    }
  });

  // 2. 체크할 때마다 현재 체크 목록을 저장해요
  $(".checks input").on("change", function () {
    let list = [];
    $(".checks input:checked").each(function () {
      list.push($(this).data("key"));
    });
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
  });
}
