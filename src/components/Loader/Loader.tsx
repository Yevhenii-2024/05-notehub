import { PacmanLoader } from "react-spinners"
import style from './Loader.module.css'

export default function Loader() {
    return  (
        <div className={style.backdrop}>
          <PacmanLoader color="#ffff00" size={50} />
        </div>
      );
}