class showAPI {
    constructor(show, width, imgnumber) {
        this.show = show;
        this.show.interval = width;
        this.show.numberImg = imgnumber;
    }
    Animate() {
        this.show.ontouchend = this.TouchEnd;
        this.show.ontouch = () => {
            this.onscroll = () => {};
        };
        this.ScrollAnimation();
    }
    TouchEnd() {
        let index = 0;

        while (index <= this.numberImg) {
            if (
                (this.scrollLeft <= this.interval * index + this.interval / 2) &
                (this.scrollLeft > this.interval * index - this.interval / 2)
            ) {
                this.scrollTo({
                    top: 0,
                    left: index * this.interval,
                    behavior: "smooth",
                });
                this.onscroll = () => {
                    this.scrollLeft = index * this.interval;
                };
            }

            index += 1;
        }
    }
    ScrollAnimation() {
        this.show.index = 0;
        var b = 1;
        setInterval(() => {
            window.show.index = (window.show.index + b) % this.show.numberImg;
            this.show.scrollTo({
                top: 0,
                left: this.show.index * this.show.interval,
                behavior: "smooth",
            });

            if (this.show.index == this.show.numberImg - 1) {
                b = -1;
            } else if (this.show.index == 0) {
                b = 1;
            }
        }, 3000);
    }
}

var show = document.getElementById("ImgShowerRoller");
var width = 900
if (window.innerWidth < 900) {
    width = window.innerWidth
}

var API = new showAPI(show, width, 4).Animate();

window.show = show;
document.getElementById("right-btn").onclick = () => {

    window.show.index += 1;
    window.show.scrollTo({
        top: 0,
        left: window.show.index * this.show.interval,
        behavior: "smooth",
    });
};
document.getElementById("left-btn").onclick = () => {
    window.show.index -= 1;
    window.show.scrollTo({
        top: 0,
        left: window.show.index * this.show.interval,
        behavior: "smooth",
    });
};

// //////////////////////Data///////////////////
var productslist = {
    productssrc: [
        "appliance.png",
        "beauty.png",
        "electronics.png",
        "kids.png",
        "kitchen.png",
        "men.png",
        "phone.png",
        "supermarket.png",
        "toys.png",
        "tv.png",
        "women.png",
    ],
    productstext: [
        "اجهزه منزيليه",
        "الجمال",
        "الكترونيات",
        "اطفال",
        "مطبخ",
        "رجال",
        "هاتف",
        "سوبر مركت",
        "العاب",
        "تلفاز",
        "نسائي",
    ],
    showsimg: [
        "N13210436A_1.png",
        "N50256329A_1.png",
        "N49741131A_1.png",
        "N47626990A_1.png",
        "N42342017A_1.png",
        "N25053378A_1.png",
        "N21961435A_1.png",
    ],
    beauty: [
        "ar_module-01.png",
        "ar_module-02.png",
        "ar_module-03.png",
        "ar_module-04.png",
    ],
    beautytext: ["مستحضرات التجميل", "مكياج", "العطور", "مستحضرات التجميل"],
};
//////////////////////container API//////////////////////
class Container {
    constructor(parant, Elements) {
        this.elements = Elements;
        this.parant = parant;
        this.Create(this.parant, Elements);
    }
    Create(parent, elements) {
        for (let index in elements) {
            let element = document.createElement(elements[index].tag);
            for (let line in elements[index]) {
                if (line == "tag") {
                    continue;
                } else if (typeof elements[index][line] == "object") {
                    this.Create(element, elements[index][line]);
                } else {
                    element[line] = elements[index][line];
                }
            }
            parent.appendChild(element);
        }
    }
}
//////////////////////////////////////
productiner = [];
for (i in productslist["productssrc"]) {
    productiner[i] = {};
    productiner[i].tag = "div";
    productiner[i].inner = [];
    productiner[i].inner[0] = {};
    productiner[i].inner[0].tag = "img";
    productiner[i].inner[0].src =
        "./asset/Sub Header/" + productslist["productssrc"][i];
    productiner[i].inner[1] = {};
    productiner[i].inner[1].tag = "p";
    productiner[i].inner[1].innerText = productslist["productstext"][i];
}

var products = new Container(document.getElementById("products"), productiner);

containerlis = [];
for (i in productslist["showsimg"]) {
    containerlis[i] = {};
    containerlis[i].tag = "div";
    containerlis[i].inner = [];
    containerlis[i].inner[0] = {};
    containerlis[i].inner[0].tag = "img";
    containerlis[i].inner[0].src =
        "./asset/Products/" + productslist["showsimg"][i];
    containerlis[i].inner[1] = {};
    containerlis[i].inner[1].tag = "p";
    containerlis[i].inner[1].innerText = "mohammed is my name";
}

//  var products = new Container(document.getElementById("showscontain"), containerlis);
//  var products = new Container(document.getElementsByClassName("showscontainer")[1], containerlis);

//////////////////////////butea////
beautylist = [];
for (i in productslist["beauty"]) {
    beautylist[i] = {};
    beautylist[i].tag = "div";
    beautylist[i].inner = [];
    beautylist[i].inner[0] = {};
    beautylist[i].inner[0].tag = "img";
    beautylist[i].inner[0].src =
        "./asset/Beauty offers/" + productslist["beauty"][i];
    beautylist[i].inner[1] = {};
    beautylist[i].inner[1].tag = "p";
    beautylist[i].inner[1].innerText = productslist["beautytext"][i];
}

var products = new Container(
    document.getElementById("beautyshowscontainer"),
    beautylist
);

var searcher = document.getElementById("searcher");
searcher.oninput = (event) => {
    event.target.parentElement.parentElement.style.borderBottomLeftRadius = "0px";
    event.target.parentElement.parentElement.style.borderBottomRightRadius =
        "0px";
    var searcherlist = document.getElementById("searchlist");
    // searcherlist.parentElement
    searcherlist.style.display = "block";
    searcherlist.innerText = "";
    let list = productslist["productstext"].filter((element) =>
        element.includes(event.target.value)
    );
    list.forEach((item) => {
        let index = productslist["productstext"].indexOf(item);
        let imagesrc = productslist["productssrc"][index];
        let div = document.createElement("div");
        div.className = "searchitem searchlistitemclick";
        let img = document.createElement("img");
        img.className = "img" + item;
        img.src = "./asset/Sub Header/" + imagesrc;
        let div2 = document.createElement("div");
        div2.className = "iteminfo searchlistitemclick";

        let div3 = document.createElement("div");
        div3.className = "itemimg searchlistitemclick";
        let text = document.createElement("p");
        text.className = "title searchlistitemclick";
        text.innerHTML = item;
        let price = document.createElement("p");
        price.className = "price searchlistitemclick";
        price.innerHTML = "200$";
        div.appendChild(div3);
        div3.appendChild(img);
        div.appendChild(div2);
        div2.appendChild(text);
        div2.appendChild(price);

        searcherlist.appendChild(div);
    });
};
document.body.onclick = (event) => {
    a = event.target.className.includes("searchlistitemclick");
    var searcherlist = document.getElementById("searchlist");
    if (!a) {
        searcherlist.style.display = "none";
    } else {
        searcherlist.style.display = "block";
    }
};