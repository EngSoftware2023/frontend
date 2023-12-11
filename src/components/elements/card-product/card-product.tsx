import { Button } from "antd";
import style from "./card-product.module.scss";

export type DataElementCardProdcut = {
  name: string;
  stock: string;
  request: string;
  onDelete: () => void;
};

export default function ElementCardProduct({
  name,
  request,
  stock,
  onDelete,
}: DataElementCardProdcut) {
  return (
    <div
      className={style.CardProduct}
      style={{
        border: `solid 2px rgba(${stock < request ? 255 : 0}, ${
          stock < request ? 0 : 255
        }, 0, .3)`,
      }}
    >
      <div className={style.containerProduct}>
        <h3>{name}</h3>
        <div className={style.containerIndicadores}>
          <div className={style.indicador}>
            <span className={style.title}>Pedidos</span>
            <span>{request}</span>
          </div>
          <div className={`${style.indicador} ${style.stock}`}>
            <span className={style.title}>Em Estoque</span>
            <span>{stock}</span>
          </div>
        </div>
      </div>
      <hr />
      <Button danger onClick={() => onDelete()}>
        Deletar
      </Button>
    </div>
  );
}
