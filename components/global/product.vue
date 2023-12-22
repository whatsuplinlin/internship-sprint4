<template>
  <div id="product" @click="this.$router.push(`/product/${props.item.id}`)">
  <!-- <div id="product" @click="this.$router.push('/product/' +props.item.id)">
  <div id="product" @click="openProducts(props.item.id)"> -->
    <div class="img-container" @mouseover="showHover()" @mouseout="hideHover()">
      <img :src="props.item.image" id="product-img" />
      <label id="discount">{{ props.item.rating }}</label>
    </div>
    <div class="product-info">
      <Popper hover :content="props.item.title">
        <p id="title">{{ props.item.title }}</p>
      </Popper>
      <p id="description">{{ props.item.description }}</p>
      <div class="price">
        <p id="price">THB {{ convertPrice(props.item.price) }}</p>
      </div>
    </div>
    <div v-show="isHovered" id="product-hover">
      <button @click="addToCart(item)">Add to cart</button>
      <div id="share-compare-like">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12 10.6667C11.4747 10.6667 11 10.8734 10.644 11.2047L5.94 8.46671C5.97333 8.31337 6 8.16004 6 8.00004C6 7.84004 5.97333 7.68671 5.94 7.53337L10.64 4.79337C11 5.12671 11.4733 5.33337 12 5.33337C13.1067 5.33337 14 4.44004 14 3.33337C14 2.22671 13.1067 1.33337 12 1.33337C10.8933 1.33337 10 2.22671 10 3.33337C10 3.49337 10.0267 3.64671 10.06 3.80004L5.36 6.54004C5 6.20671 4.52667 6.00004 4 6.00004C2.89333 6.00004 2 6.89337 2 8.00004C2 9.10671 2.89333 10 4 10C4.52667 10 5 9.79337 5.36 9.46004L10.0587 12.2054C10.0211 12.3563 10.0014 12.5112 10 12.6667C10 13.0623 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5145C11.6001 14.6658 12.0022 14.7054 12.3902 14.6283C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0569C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5359 13.44 11.2235 13.1111 11.0038C12.7822 10.784 12.3956 10.6667 12 10.6667Z"
              fill="white"
            />
          </svg>
          <p>Share</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.08 7L11.08 8L14.52 4.55L11 1L10 2L11.8 3.8H2.00004V5.2H11.82L10.08 7ZM5.86004 9L4.86004 8L1.42004 11.5L4.91004 15L5.91004 14L4.10004 12.2H14V10.8H4.10004L5.86004 9Z"
              fill="white"
            />
          </svg>
          <p>Compare</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.99973 14.0361C-5.33333 6.66669 3.99999 -1.33331 7.99973 3.72539C12 -1.33331 21.3333 6.66669 7.99973 14.0361Z"
              stroke="white"
              stroke-width="1.8"
            />
          </svg>
          <p>Like</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});

const isHovered = ref(false);

function showHover() {
  isHovered.value = true;
}

function hideHover() {
  isHovered.value = false;
}

function addToCart(item) {
  event.stopPropagation();

  const quantity = 1;
  const existingIndex = useCartStore().items.findIndex(
    (product) => product.name === item.name
  );

  if (existingIndex !== -1) {
    useCartStore().items[existingIndex].quantity =
      parseInt(useCartStore().items[existingIndex].quantity) +
      parseInt(quantity);
  } else {
    const formattedPrice = formatPrice(item.price);
    const itemToAdd = {
      id: item.key,
      name: item.name,
      price: formattedPrice,
      quantity: quantity,
    };
    useCartStore().addItem(itemToAdd);
  }

  console.log(useCartStore());
  useRouter().push("/cart");
}

function formatPrice(price) {
  const pattern = /(\d)(\.)(\d)/g;
  const formattedString = price.replace(pattern, "$1,$3");
  return formattedString + ".00";
}

function convertPrice(price) {
  return new Intl.NumberFormat().format(price)
}
</script>

<style lang="scss" scoped>
#product {
  width: 285px;
  background: #f4f5f7;
  cursor: pointer;
  position: relative;
  & .img-container {
    position: relative;
    & img {
      width: 285px;
      aspect-ratio: 3/4;
    }
    & label {
      position: absolute;
      top: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      color: #fff;
      border-radius: 50%;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      background: #e97171;
    }
  }
  & .product-info {
    padding: 16px;
    & #title {
      color: #3a3a3a;
      font-size: 24px;
      font-weight: 600;
      line-height: 120%;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    & #description {
      color: #898989;
      font-weight: 500;
      line-height: 150%;
      margin: 8px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    & .price {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & #price {
        color: #3a3a3a;
        font-size: 20px;
        font-weight: 600;
        line-height: 150%;
        margin: 0;
      }
      & p#origin-price {
        color: #b0b0b0;
        line-height: 150%;
        text-decoration: line-through;
      }
    }
  }
}

#product-hover {
  display: flex;
  width: 285px;
  height: 380px;
  background: rgb(58, 58, 58, 0.72);
  position: absolute;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  & button {
    width: 202px;
    height: 48px;
    background: #fff;
    border: none;
    color: #b88e2f;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    cursor: pointer;
  }
  & #share-compare-like {
    display: flex;
    gap: 20px;
    & div {
      display: flex;
      align-items: center;
      & p {
        color: #fff;
        font-weight: 600;
        line-height: 150%;
        margin: 0;
      }
    }
  }
}
</style>
<style>
:root {
  --popper-theme-background-color: #f9f1e7;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #3a3a3a;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 16px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);

}
</style>