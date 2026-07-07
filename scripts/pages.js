class TitlePage extends HTMLElement {
    connectedCallback() {
        // Сюда пишем весь HTML, который должен появиться на месте тега
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                body {
                    font-family: 'Times New Roman';
                    background-color: #f0f2f5;
                    margin: 0;
                    padding: 10px;
                    display: flex;
                    align-items: flex-start;
                    padding: 10px 10px;
                    justify-content: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                .container {
                    background: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    width: 100%;
                    max-width: 550px;
                }
                h2 {
                    color: #2c3e50;
                    margin: 0 0 20px 0;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 8px;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 12px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }
                label {
                    margin-bottom: 2px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 11px;
                }
                input, textarea {
                    width: 100%;
                    padding: 5px 8px;
                    border: 1px solid #cbd5e1;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 12px;
                    transition: border-color 0.2s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #3498db;
                }
                textarea {
                    resize: none;
                    height: 38px;
                }
                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s;
                }
                button:hover {
                    background-color: #2980b9;
                }
                #university {
                    height: 50px;
                    overflow: hidden;
                }
            </style>
            <div class="container">
                <h2>Данные титульного листа</h2>
                <div class="form-container">
                    <div class="form-group">
                        <label for="university">Полное название организации:</label>
                        <textarea id="university">Федеральное государственное бюджетное образовательное учреждение высшего образования&#10;«Саратовский государственный технический университет имени Гагарина Ю.А.»</textarea>
                    </div>
                    <div class="form-group">
                        <label for="institute">Институт (сокращение):</label>
                        <input type="text" id="institute" value="Институт урбанистики архитектуры и строительства (УРБАС)">
                    </div>
                    <div class="form-group">
                        <label for="department">Кафедра (сокращение):</label>
                        <input type="text" id="department" value="Кафедра «Строительные материалы, конструкции и технологии (СМКТ)»">
                    </div>
                    <div class="form-group">
                    <label for="direction">Направление:</label>
                    <input type="text" id="direction" value="08.05.01 Строительство уникальных зданий и сооружений (СЗС)">
                </div>
                <div class="form-group">
                    <label for="profile">Профиль:</label>
                    <input type="text" id="profile" value="Строительство высотных и большепролетных сооружений">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="workType">Тип работы:</label>
                        <input type="text" id="workType" value="Курсовая работа">
                    </div>
                    <div class="form-group">
                        <label for="discipline">Дисциплина:</label>
                        <input type="text" id="discipline" value="Металлические конструкции">
                    </div>
                </div>
                <div class="form-group">
                    <label for="topic">Тема работы:</label>
                    <textarea id="topic">Проектирование средней ячейки балочной клетки промышленного здания</textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="studentInst">Студент института:</label>
                        <input type="text" id="studentInst" value="УРБАС">
                    </div>
                    <div class="form-group">
                        <label for="group">Группа:</label>
                        <input type="text" id="group" value="с1-СЗС-31">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="educationForm">Форма обучения:</label>
                        <input type="text" id="educationForm" value="очная">
                    </div>
                    <div class="form-group">
                        <label for="gradebook">№ зачетной книжки:</label>
                        <input type="text" id="gradebook" value="230213">
                    </div>
                </div>
                <div class="form-group">
                    <label for="authorName">ФИО Студента:</label>
                    <input type="text" id="authorName" value="Егиазарян Карен Масисович">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="reviewerDep">Кафедра проверяющего:</label>
                        <input type="text" id="reviewerDep" value="СМКТ">
                    </div>
                    <div class="form-group">
                        <label for="reviewerName">ФИО Преподавателя:</label>
                        <input type="text" id="reviewerName" value="Шагивалеев Камиль Фатыхович">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="city">Город:</label>
                        <input type="text" id="city" value="Саратов">
                    </div>
                    <div class="form-group">
                        <label for="year">Год:</label>
                        <input type="text" id="year" value="2026">
                    </div>
                </div>
                <button id="TitlePageBut">Скачать титульный лист</button>
            </div>
        `;}}
customElements.define('title-page', TitlePage);

class Introduction extends HTMLElement {
    connectedCallback() {
        // Сюда пишем весь HTML, который должен появиться на месте тега
        const shad = this.attachShadow({ mode: 'open' });
        shad.innerHTML = `
            <style>
                body {
                    font-family: 'Times New Roman';
                    background: #f0f2f5;
                    margin: 0;
                    padding: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 10px 10px;
                    height: 100vh;
                    box-sizing: border-box;
                    overflow: hidden;
                }
                .container {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0,0,0,.1);
                    padding: 25px;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    max-width: 550px;
                    display: flex;
                    flex-direction: column;
                }

                h2 {
                    color: #2c3e50;
                    margin: 0 0 20px 0;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 8px;
                }


                .form-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .form-group {
                    color: #2c3e50;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin-bottom: 8px;
                    font-weight: 600;
                }

                textarea {
                    flex: 1;
                    width: 100%;
                    padding: 12px;
                    box-sizing: border-box;

                    font-family: "Times New Roman", serif;
                    font-size: 13px;
                    line-height: 1.5;

                    border: 1px solid #cbd5e1;
                    border-radius: 4px;

                    resize: none;
                }

                textarea:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52,152,219,.15);
                }

                button {
                    margin-top: 15px;
                    padding: 14px;
                    font-size: 14px;
                    font-weight: bold;
                    border: none;
                    border-radius: 5px;
                    background: #3498db;
                    color: white;
                    cursor: pointer;
                }

                button:hover {
                    background: #2980b9;
                }
            </style>
            <div class="container">
            <h2>Редактирование текста введения</h2>
            
            <div class="form-container">
                <div class="form-group">
                    <label for="introductionText">Текст введения (разбивайте на абзацы пустой строкой):</label>
                    <textarea id="introductionText">Балочная клетка представляет собой систему несущих элементов стального перекрытия, предназначенную для восприятия и передачи действующих нагрузок на опорные конструкции здания. В ее состав входят стальной настил, балки настила, вспомогательные балки, главные балки и колонны сквозного сечения с планками. Нагрузка от настила и пола передается на балки настила, затем через вспомогательные балки – на главные балки, а далее – на колонны и фундамент.

Основной целью расчета балочной клетки является обеспечение прочности, жесткости и устойчивости всех элементов конструкции при наиболее рациональном расходе стали и минимальных затратах на изготовление и монтаж. Для достижения этой цели выполняется определение расчетных нагрузок, внутренних усилий, подбор сечений элементов и проверка их несущей способности в соответствии с требованиями действующих нормативных документов.

Расчет конструкций выполняется с использованием положений сопротивления материалов и строительной механики, позволяющих определить напряженно-деформированное состояние элементов под действием постоянных и временных нагрузок.

Проектирование балочной клетки выполняется в соответствии с требованиями следующих нормативных документов:
СП 16.13330.2017 «Стальные конструкции»;
СП 20.13330.2016 «Нагрузки и воздействия».</textarea>
                </div>
            </div>
            <button id="IntroBut">Скачать введение</button>
        </div>
        `;}}
customElements.define('intro-moment', Introduction);

class InitData extends HTMLElement {
    connectedCallback() {
        // Сюда пишем весь HTML, который должен появиться на месте тега
        const shado = this.attachShadow({ mode: 'open' });
        shado.innerHTML = `
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f0f2f5;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    align-items: flex-start;
                    padding: 10px 10px;
                    justify-content: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 550px;
                }
                h2 {
                    color: #2c3e50;
                    margin: 0 0 20px 0;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 8px;
                }
                h3 {
                    color: #34495e;
                    font-size: 13px;
                    margin: 15px 0 8px 0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-left: 3px solid #3498db;
                    padding-left: 8px;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 25px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                .form-r {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 12px;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }
                .form-row-triple {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 10px;
                }
                label {
                    margin-bottom: 4px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 11px;
                }
                input, textarea {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #cbd5e1;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 13px;
                    color: #334155;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
                }
                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s;
                }
                button:hover {
                    background-color: #2980b9;
                }
            </style>
            <div class="container">
                <h2>Заполнение таблицы исходных данных</h2>
                <div class="form-container">
                    <div class="form-row-triple">
                        <div class="form-group">
                            <label for="taskNum">№ задания:</label>
                            <input type="text" id="taskNum" value="13">
                        </div>
                    </div>
                    <h3>Геометрические параметры и нагрузка</h3>
                    <div class="form-row-triple">
                        <div class="form-group">
                            <label for="paramL">L, м:</label>
                            <input type="text" id="paramL" value="10">
                        </div>
                        <div class="form-group">
                            <label for="param_l">l, м:</label>
                            <input type="text" id="param_l" value="5">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="paramH">H, м:</label>
                            <input type="text" id="paramH" value="4,8">
                        </div>
                        <div class="form-group">
                            <label for="payload">Полезная нагрузка (кН/м²):</label>
                            <input type="text" id="payload" value="30">
                        </div>
                    </div>
                    <h3>Конструктивные особенности и материалы</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="concrete">Класс бетона под фундаменты:</label>
                            <input type="text" id="concrete" value="B7.5">
                        </div>
                        <div class="form-group">
                            <label for="columns">Колонны:</label>
                            <input type="text" id="columns" value="Сплошного сечения">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="joints">Укрупнительные стыки балок:</label>
                            <input type="text" id="joints" value="-">
                        </div>
                        <div class="form-group">
                            <label for="floorType">Тип пола:</label>
                            <input type="text" id="floorType" value="1">
                        </div>
                    </div>
                    <div class="form-r">
                        <div class="form-group">
                            <label for="note">Примечание:</label>
                            <input type="text" id="note" value="Главный корпус тепловой электростанции">
                        </div>
                    </div>
                </div>
                <button id="InitBut">Скачать исходные данные</button>
            </div>
        `;}}
customElements.define('init-data', InitData);

class varGen extends HTMLElement {
    connectedCallback() {
        // Сюда пишем весь HTML, который должен появиться на месте тега
        const shgen = this.attachShadow({ mode: 'open' });
        shgen.innerHTML = `
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f0f2f5;
                    margin: 0;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 550px;
                }
                h2 {
                    color: #2c3e50;
                    margin: 0 0 20px 0;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 8px;
                }
                h3 {
                    color: #34495e;
                    font-size: 13px;
                    margin: 15px 0 8px 0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-left: 3px solid #3498db;
                    padding-left: 8px;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 7px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                .form-r {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 12px;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }
                .form-row-triple {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 10px;
                }
                label {
                    margin-bottom: 4px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 11px;
                }
                input, textarea {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #cbd5e1;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 13px;
                    color: #334155;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
                }
                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s;
                }
                button:hover {
                    background-color: #2980b9;
                }
                #canvas {
                    border: 5px solid #3498db;
                    border-radius: 8px;
                }
                #withCanvas {
                    max-width: 550px;
                    padding-bottom: 10px;
                }
                label {
                    margin-bottom: 4px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 15px;
                    font-family: Arial;
                }
            </style>
            <div class="container" id="withCanvas">
                <h2>Создание вариантов балочной клетки</h2>
                <div class="form-container">
                    <div class="form-row-triple">
                        <div class="form-group">
                            <h3>1-й вариант</h3>
                        </div>
                        <div class="form-group">
                            <label>a, м:</label>
                            <input type="text" id="variant1A">
                        </div>
                        <div class="form-group">
                            <label>b, м:</label>
                            <input type="text" id="variant1B">                      
                        </div>
                    </div>
                    
                    <div class="form-row-triple">
                        <div class="form-group">
                            <h3>2-й вариант</h3>
                        </div>
                        <div class="form-group">
                            <label>a, м:</label>
                            <input type="text" id="variant2A">
                        </div>
                        <div class="form-group">
                            <label>b, м:</label>
                            <input type="text" id="variant2B">                      
                        </div>
                    </div>
                    
                    <div class="form-row-triple">
                        <div class="form-group">
                            <h3>3-й вариант</h3>
                        </div>
                        <div class="form-group">
                            <label>a, м:</label>
                            <input type="text" id="variant3A">
                        </div>
                        <div class="form-group">
                            <label>b, м:</label>
                            <input type="text" id="variant3B">                      
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <button id="varGen">Создать варианты</button>
                    </div>
                    <div class="form-group">
                        <button id="varDel">Очистить варианты</button>          
                    </div>      
                </div><br>          
                <div class="form-row-triple">
                        <div class="form-group">
                            <button id="varZoom1">Зум В1</button>           
                        </div>
                    <div class="form-group">
                        <div class="form-group">
                            <button id="varZoom2">Зум В2</button>           
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-group">
                            <button id="varZoom3">Зум В3</button>           
                        </div>                      
                    </div>
                </div><br>
                <div class="form-container" id="canvas-container">
                    <canvas id="canvas"></canvas>
                </div>
                <div class="form-row">
                    <div class="form-group" id="loader">
                        <button id="varLoad1">Скачать скрин</button>
                    </div>
                    <div class="form-group">
                        <button id="varLoad">Скачать все варианты</button>
                    </div>
                </div>
            </div><br>
        `;}}
customElements.define('var-gen', varGen);

class Literature extends HTMLElement {
    connectedCallback() {
        // Сюда пишем весь HTML, который должен появиться на месте тега
        const sha = this.attachShadow({ mode: 'open' });
        sha.innerHTML = `
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f0f2f5;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    align-items: flex-start;
                    padding: 10px 10px;
                    justify-content: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 550px;
                    box-sizing: border-box;
                }
                h2 {
                    color: #2c3e50;
                    margin: 0 0 10px 0;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 5px;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 15px;
                }
                label {
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 12px;
                }
                .source-item {
                    display: flex;
                    gap: 8px;
                    align-items: flex-start;
                    background: #f8fafc;
                    padding: 10px;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                }
                .source-number {
                    font-weight: bold;
                    color: #64748b;
                    margin-top: 8px;
                    min-width: 20px;
                }
                textarea {
                    flex-grow: 1;
                    height: 95px;
                    padding: 8px;
                    border: 1px solid #cbd5e1;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 13px;
                    line-height: 1.4;
                    color: #334155;
                    resize: vertical;
                }
                textarea:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
                }
                .btn-delete {
                    background-color: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 12px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 4px;
                }
                .btn-delete:hover {
                    background-color: #dc2626;
                }
                .btn-add {
                    background-color: #10b981;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s;
                    text-align: center;
                }
                .btn-add:hover {
                    background-color: #059669;
                }
                .btn-submit {
                    width: 100%;
                    padding: 14px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s;
                    box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
                    margin-top: 10px;
                }
                .btn-submit:hover {
                    background-color: #2980b9;
                }
            </style>
            <div class="container">
                <h2>Список используемой литературы:</h2>
                <div class="form-container">
                    <label>Источники:</label>
                    <div id="sourcesContainer" class="form-container" style="margin-bottom: 0; gap: 10px;"></div>
                    <button type="button" class="btn-add" id="addSourceBut">+ Добавить источник</button>
                </div>
                <button class="btn-submit" id="LitBut">Скачать список литературы</button>
            </div>
        `;}}
customElements.define('literature-list', Literature);