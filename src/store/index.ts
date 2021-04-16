//index.ts
import HomeStore from './home'
import DetailStore from './detail'

export default {
    homeStore: new HomeStore(),
    detailStore: new DetailStore(),
}
