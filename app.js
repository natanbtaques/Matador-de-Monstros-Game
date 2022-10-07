new Vue({
    el:'#app',
    data:{
        running:false,
        playerLife:100,
        MonsterLife:100,
        logs: [],
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.MonsterLife == 0
        }
    },
    methods:{
        startGame(){
            this.running = true
            this.playerLife = 100
            this.MonsterLife= 100
            this.logs=[]
        },
        attack(especial){
            this.hurt('MonsterLife', 5, 10,especial,'Jogador','Monstro','Player')
            if(this.MonsterLife>0){
                this.hurt('playerLife', 7, 12,false,'Monstro','Jogador','Monster')
            }
        },

        hurt(prop,min,max,especial,source,target,cls){
            /*Lógica que define a adição do especial, caso especial seja true adiciona 5, caso seja false
            ira adicionar 0 ao ataque do jogador */
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            /*aqui é definido que o menor valor possivel para a vida do jogador será zero  */
            this[prop] = Math.max(this[prop] - hurt,0)
            /* registerLog = Plota a informação em texto */
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`,cls)
        },
        
        healAndHurt(){
            this.heal(10,15)
            this.hurt('playerLife',7,12,false,'Monstro','Jogador','Monster')
        },

        heal(min,max){
            const heal = this.getRandom(min, max)
            /*aqui é definido que o maior valor possivel para a vida do jogador será 100  */
            this.playerLife= Math.min(this.playerLife + heal,100)
            this.registerLog(`O jogador ganhou força de ${heal}`,'Player')
        },
        getRandom(min,max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text,cls){
            /*Unshift faz com que o ultimo texto sempre esteja na parte superior */
            this.logs.unshift({ text , cls })
        }

    },
    watch:{
        hasResult(value){
            /*Define que caso value seja verdadeiro, ou seja se receber zero da vida do monstro
            ou do jogador, ele direciona o running para false*/
            if (value) this.running=false
        }

    }
})