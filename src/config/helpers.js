export const firebaseLooper = snapshot => {
  let items = [];

  snapshot.forEach((item, i) => {
    items.push({
      id: item.key,
      data: item.val(),
    });
  });

  return items;
};
