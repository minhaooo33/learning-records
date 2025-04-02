export async function fetchAvailbalePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("faild to fetch places");
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT", //定義發送哪個http請求方法
    body: JSON.stringify({ places: places }), //定義哪些數據應該作為 『請求主體』附加到該傳出請求
    headers: {
      "Content-Type": "application/json", //通知後端附加該請求的數據將採用JSON格式
    },
  });

  const resData = await response.json();

  if (!response) {
    throw new Error("上傳使用者資料失敗");
  }
  return resData.message;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("faild to fetch user places");
  }
  return resData.places;
}
