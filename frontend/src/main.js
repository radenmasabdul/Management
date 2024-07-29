import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style/style.css'
import App from './App.vue'
import router from "./routes"
import VueAwesomePaginate from "vue-awesome-paginate"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons";

import {
    Chart as ChartJS,
    BarController,
    BarElement,
    DoughnutController,
    ArcElement,
    LineController,
    LineElement,
    PointElement,
    PieController,
    PolarAreaController,
    RadarController,
    BubbleController,
    ScatterController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    BarController,
    BarElement,
    DoughnutController,
    ArcElement,
    LineController,
    LineElement,
    PointElement,
    PieController,
    PolarAreaController,
    RadarController,
    BubbleController,
    ScatterController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
)

library.add(fas)

const pinia = createPinia()
const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.use(VueAwesomePaginate);
app.mount('#app')
