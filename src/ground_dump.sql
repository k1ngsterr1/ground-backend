--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)
-- Dumped by pg_dump version 17.5 (Ubuntu 17.5-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comparison; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comparison" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Comparison" OWNER TO postgres;

--
-- Name: ComparisonProperty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComparisonProperty" (
    id integer NOT NULL,
    "comparisonId" integer NOT NULL,
    "propertyId" integer NOT NULL
);


ALTER TABLE public."ComparisonProperty" OWNER TO postgres;

--
-- Name: ComparisonProperty_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ComparisonProperty_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComparisonProperty_id_seq" OWNER TO postgres;

--
-- Name: ComparisonProperty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ComparisonProperty_id_seq" OWNED BY public."ComparisonProperty".id;


--
-- Name: Comparison_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comparison_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comparison_id_seq" OWNER TO postgres;

--
-- Name: Comparison_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comparison_id_seq" OWNED BY public."Comparison".id;


--
-- Name: Favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Favorite" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "propertyId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Favorite" OWNER TO postgres;

--
-- Name: Favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Favorite_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Favorite_id_seq" OWNER TO postgres;

--
-- Name: Favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Favorite_id_seq" OWNED BY public."Favorite".id;


--
-- Name: Property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Property" (
    id integer NOT NULL,
    name text NOT NULL,
    image text[],
    square double precision NOT NULL,
    price double precision NOT NULL,
    number text NOT NULL,
    contact text NOT NULL,
    agent boolean NOT NULL,
    owner boolean NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    link text,
    details text
);


ALTER TABLE public."Property" OWNER TO postgres;

--
-- Name: Property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Property_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Property_id_seq" OWNER TO postgres;

--
-- Name: Property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Property_id_seq" OWNED BY public."Property".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Comparison id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comparison" ALTER COLUMN id SET DEFAULT nextval('public."Comparison_id_seq"'::regclass);


--
-- Name: ComparisonProperty id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComparisonProperty" ALTER COLUMN id SET DEFAULT nextval('public."ComparisonProperty_id_seq"'::regclass);


--
-- Name: Favorite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite" ALTER COLUMN id SET DEFAULT nextval('public."Favorite_id_seq"'::regclass);


--
-- Name: Property id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property" ALTER COLUMN id SET DEFAULT nextval('public."Property_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Comparison; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comparison" (id, "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: ComparisonProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ComparisonProperty" (id, "comparisonId", "propertyId") FROM stdin;
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Favorite" (id, "userId", "propertyId", "createdAt") FROM stdin;
\.


--
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Property" (id, name, image, square, price, number, contact, agent, owner, type, description, location, link, details) FROM stdin;
3	СТ Степной	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891595-469605042.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891599-391703019.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891601-567125982.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891604-932407034.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891606-412400733.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891608-322503905.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891610-241110209.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891612-251070879.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891615-468772891.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749806891615-475403578.JPG}	4	2650000	91:02:006021:158	Виктор	t	f	ground	Участок общей площадью 8,84 сотки в СТ Степной, Гагаринский район г. Севастополя.\r\n\r\nМожем разделить на 2 по 4 сотки, или продать целиком. Цена указана за 4 сотки.\r\n\r\nЦена за 8 соток будет выше, но не в 2 раза.\r\n\r\nЗвоните, предлагайте, обсудим.\r\n\r\nРазмер участка 32м*28м, что позволяет построить дом большого размера, баню и зону отдыха, разместить гараж, при желании. Также можно разделить участок на два.  Приятным бонусом к участку идет собственный бассейн и скважина с водой.\r\n\r\nКоммуникации:\r\n\r\nВода – городская, круглогодичная, есть своя скважина;\r\n\r\nСвет – три фазы, городские электросети по тарифам города, новое мощное ТП (своя);\r\n\r\nГаз – в перспективе согласно плану развития;\r\n\r\nВывоз мусора – централизованное от города;\r\n\r\nОстановка общественного транспорта – примерно 800 метров от участка.\r\n\r\nДокументы проверены юристами и готовы к сделке. Звоните, организую показ в удобное для Вас время.	44.536782, 33.495473		
5	СТ Кальфа-1	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749818940931-221760503.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749818940934-997454541.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749818940936-589629688.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749818940938-574082611.png,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749818940943-382546949.png,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749818940945-239388204.png}	4	2490000	91:01:005005:882	Игорь	t	f	ground	Участок 4 сотки (СТ) расположен в г. Севастополь, Балаклавский район, Балка Бермана, СТ “Кальфа-1”. Ровный, без уклона. Со сторонами 17м*27м14м*26м\r\n\r\nПозвоните нам, чтобы узнать все детали!\r\n\r\nКоммуникации:\r\n\r\nЭлектричество: 15 кВт\r\n\r\nВодоснабжение: по графику\r\n\r\nГаз: в перспективе\r\n\r\nУчасток отлично подойдет для постройки дома для загородного проживания, т.к. находится вдали от городской суеты, в спокойном и чистом месте. Активно идет строительство домов и развитие района. До остановки 350м.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.527593, 33.542284		
7	Большой участок в 100 метрах от остановки	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951950-385304029.jfif,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951956-168381491.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951958-74143214.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951959-153378978.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951961-176125180.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951963-855522968.PNG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750072951964-977298265.png}	6.2	5200000	91:02:006032:1048		t	f	ground	Участок 6,2 сотки (СТ) расположен в г. Севастополь, Гагаринский район, СТ Милосердие. Ровный, правильной формы, без уклона.\r\n\r\nПозвоните нам, чтобы узнать все детали!\r\n\r\nКоммуникации:\r\n\r\nЭлектричество: 10 кВт\r\n\r\nВодоснабжение: Есть\r\n\r\nГаз: в перспективе\r\n\r\nУчасток расположен вблизи Т-образного перекрестка, в 65 метрах от главной дороги, отлично подойдет для постройки дома для загородного проживания.\r\nУчасток находится в районе с развитой для комфортной жизни инфраструктурой, до ближайшей остановки автотранспорта и магазинов 5 минут пешком.\r\nВ пешей доступности смотровая площадка и Свято-Георгиевский монастырь,\r\nГрот Дианы и все живописные пляжи Фиолента.\r\nВ 10 минутах езды на авто 5 км и выезд на Ялтинское шоссе и Балаклаву.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.515536, 33.489014		
8	СТ Планер	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750340497903-785040449.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750340497909-928739959.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750340497913-399352582.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750340497915-223421538.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750340497918-698508731.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750340497919-552838805.JPG}	4	3500000	91:02:006005:1950	Виктор	t	f	ground	БЕЗ комиссии для покупателя и скрытых платежей !!!\r\n\r\nB пpoдaже отличный земeльный учacтoк, площадью 4 cотки, pаспoлoжeнный пo aдрecу: г.Сeвaстoполь, Гагаpинcкий р-н, ТCH "Плaнеp", ш. Фиолентовское\r\n\r\nУчaстoк рoвный, без уклона. Трапецевидной формы с фасадом 28м.\r\n\r\nРазмеры участка 28м*21м*17м*19м. Получено ГПЗУ и Уведомление о начале строительства.\r\n\r\nКоммуникации:\r\n\r\nэлектричество по границе участка, от Севэнерго - 15 кВт,\r\nкооперативная вода, подается круглогодично.\r\n\r\nКооператив жилой, заменены все коммуникации, хорошие подъездные пути, соседи проживают круглогодично. Улицы освещаются в вечернее время.\r\n\r\nОт остановки - минут 15 пешком. Поблизости расположены продуктовые магазины, спуск к берегу моря в районе Автобата, открылась новая поликлиника.\r\n\r\nВ нескольких остановках расположены - школы, садики, гипермаркет "Метро", различные магазины, салоны и т.д.\r\n\r\nДокументы РФ, проверены юристами и готовы к сделке.\r\n\r\nПолное сопровождение ипотеки - от одобрения до постройки дома под ключ.\r\nЗвоните, покажу в любое время!	44.548429, 33.443946		
9	Большой, ухоженный участок по супер-цене	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898483-555281820.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898490-725263522.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898496-294845043.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898498-777358319.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898502-422511341.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898508-397224517.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898510-420634463.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898513-100128662.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898517-202205808.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750839898518-361911710.JPG}	6.2	2950000	91:02:003008:68	Оксана +7 978 784-07-40	t	f	ground	БЕЗ комиссии для покупателя и скрытых платежей !!!\r\n\r\nУчасток 6,2 соток расположен в г. Севастополь, Гагаринский район, СТ Океан-МГИ. Ровный, правильной формы, без уклона.\r\n\r\nПозвоните нам, чтобы узнать все детали!\r\n\r\nКоммуникации:\r\n\r\nЭлектричество: По границе\r\n\r\nВодоснабжение: Кооперативное\r\n\r\nГаз: В перспективе\r\n\r\nКомфортная для проживания локация.\r\nУчасток находится в районе с развитой инфраструктурой, где есть все необходимое для жизни. В пешей доступности расположены магазины, строительный супермаркет, остановки общественного транспорта и т.д.\r\n\r\nНа участке расположен небольшой дачный домик 8 м², не зарегистрирован, может быть использован как бытовка, при строительстве дома.\r\nЕсть металлическая ёмкость, которая может пригодиться для накопления воды в сезон.\r\n\r\nУчасток расположен возле дороги, можно организовать въезд, имеет хороший подъездной путь. Проход к участку имеет ширину 2,5 м.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.568475, 33.491511		
10	СТ Интернационалист	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198738-938600784.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198746-198858715.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198751-415148456.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198755-422870899.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198758-877344239.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198760-972473318.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198763-419014508.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198765-21372269.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750923198766-444572106.jpg}	4.4	3400000	91:02:006019:305	Виктор	t	f	ground	БЕЗ комиссии для покупателя и скрытых платежей !!!\r\n\r\nПродам участок 4.4 сотки, расположен в г. Севастополь, Гагаринский район, ТСН СНТ “Интернационалист”. Участок ровный, прямоугольной формы, без уклона.\r\n\r\nКоммуникации:\r\n\r\nЭлектричество 3 фазы - по границе участка\r\n\r\nВода - в кооперативе своя скважина, вода круглогодичная\r\n\r\nУчасток расположен в районе с активной, современной жилой застройкой, соседи проживают круглогодично.\r\nУчасток выровнен и очищен, по периметру установлен забор, что значительно сэкономит ваш бюджет.\r\nДо СТ в 2024 году проложили качественную, асфальтированную дорогу.\r\nК участку проходит широкая , хорошо укатанная грунтовка, от асфальта 200 метров.\r\n\r\nСТ Интернационалист полностью окружен лесом, благодаря чему, воздух здесь чище, также лес частично защищает от фиолентовских ветров.\r\nВ лесу много белок, поют птицы. Прогулка в утренние часы с питомцами, доставит максимальное удовольствие любителям загородной жизни.\r\n\r\nИнфраструктура:\r\n\r\nУчасток находится в районе с развивающейся инфраструктурой, где в радиусе 5 км расположены: ТЦ, магазины, рынки, пляжи, детские сады, школы и т.п. Благодаря удобной транспортной развязке Фиолентовского кольца, вы быстро и без труда сможете доехать в любой район города.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы РФ. Проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.538966, 33.468119		
11	Участок с газом на Эдельвейсовой	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217537-271814651.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217538-988186631.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217541-525550157.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217543-368472297.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217544-74368739.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217546-817937328.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217547-751413585.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217549-905755754.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750924217549-732551409.JPG}	5	7490000	91:02:003013:757	Виктор	t	f	ground	БЕЗ комиссии для покупателя и скрытых платежей !!!\r\n\r\nУчасток 5 соток (ИЖС) расположен в г. Севастополь, Гагаринский район, Проезд Эдельвейсовый. Ровный, правильной формы, без уклона.\r\n\r\nПозвоните нам, чтобы узнать все детали!\r\n\r\nГородские коммуникации:\r\n\r\nЭлектричество: 15 кВт\r\n\r\nВодоснабжение: Есть\r\n\r\nГаз: Есть\r\n\r\nОчень комфортная для проживания локация.\r\nПрестижный микрорайон.\r\nДорога выложена брусчаткой.\r\nРядом с участком сосновый лес.\r\n\r\nДо Камышового шоссе 300м, до остановки общественного транспорта 430м.\r\n\r\nУчасток находится в районе с развитой для комфортной жизни инфраструктурой, до 5 км и выезда на Ялтинское шоссе и Балаклаву на автомобиле 10 минут.\r\nВ 20 минутах смотровая площадка и Свято-Георгиевский монастырь,\r\nГрот Дианы и все живописные пляжи Фиолента.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.557595, 33.500261		
13	Дом Хай-Тек в СТ Интернационалист	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271397047-167518961.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618658-476311283.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618660-965469690.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618663-345717768.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618666-665876749.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618667-821231142.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618667-774519055.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618668-489015509.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618669-387007576.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618669-628669112.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618670-802737481.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618670-568764685.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618671-311020026.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618671-620889575.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618672-537643479.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618674-505650528.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751271618677-653773032.JPG}	4.5	11800000		Валера	t	f	house	БЕЗ комиссии для покупателя !\r\n\r\nПодходит для всех видов ипотек, в том числе и семейной!!\r\n\r\nПросторный , светлый дом 120 м.кв с высокими потолками в СТ Интернационалист на участке 4,5 сотки.\r\nДом на этапе строительства.\r\n\r\nПланировка:\r\nКухня гостиная 21,4 м.кв, с выходом на террасу,\r\n2 изолированные комнаты по 13,8м.кв, мастер-спальня 14 м.кв с санузлом и санузел в холле.\r\n\r\nБольшие окна.\r\nВысокие потолки 3 м в чистоте.\r\n\r\nВ цену данного объекта входит:\r\n- Теплый пол и разводка труб в ванной.\r\n- Стяжка полов.\r\n- Электромонтажные черновые работы.\r\n- Шпатлевка стен под обои.\r\n- Фасад под ключ ( утепление фасада 50мм мин ватой)\r\nПр желанию заказчика и дополнительную плату сделаем до состояния "под тапочки"\r\n\r\nКоммуникации:\r\n\r\n— Вода ;\r\n\r\n— Электричество 15кВт;\r\n\r\n— Канализация - септик.\r\n\r\nДом от застройщика, без комиссии для покупателя.\r\n\r\nПодходит под наличный расчет и ипотеку.\r\n\r\nДокументы РФ проверены юристами и готовы к сделке. Звоните! Организую\r\n\r\nУслуги агентов приветствуются.	44.538966, 33.468119		
4	Видовой участок 10 соток ИЖС в Передовом	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560865-61155470.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560867-851340340.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560869-159914016.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560874-501103692.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560876-838820039.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560878-219202689.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560879-115788811.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560881-38597247.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560882-670212120.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560883-817086035.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560884-516725301.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751375560885-765387128.jpg}	9	4560000	91:01:043002:251	Виктор	t	f	ground	Продам шикарный видовой участок вблизи Чернореченского водохранилища в с. Передовое, Балаклавского района.С участка открываются живописные виды на долину и горы.Площадь 10 соток, практически правильной квадратной формы со сторонами 33м*33м.При необходимости можно разделить участок на два.Получено ГПЗУ с полным пятном застройки. Ограничений нет. Площадь застройки - 40%.Коммуникации:- Городская вода, колодец в 50м, тех.условие на подключение получено;- электричество 15кВт, заведено на участок;- есть возможность подвести газ.В пешей доступности находятся лес, ручей (Кобалар-Су), водопад (Козырёк), два озера (Нижнее и Верхнее) в которых можно купаться и рыбачить, отлично подойдёт для любителей природы и прогулок. Недалеко расположено Чернореченское водохранилище, благодаря которому село находится в отличной для жизни климатической зоне.До Севастополя 25 км. Общественный транспорт ходит каждые 40 мин.Подходит для наличного расчета и под ипотеку. Документы РФ. Проверены юристами и готовы к сделке.Профессиональное сопровождение до получения права собственности. Добавьте предложение в закладки, чтобы не потерять! 	44.511847, 33.827472		
14	Участок 4,3 сотки рядом с лесом	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175129-83481482.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175132-612241266.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175136-681751508.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175141-301340758.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175142-352450100.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175143-42829408.JPG,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1751531175144-704478132.JPG}	4.3	2700000	91:02:006019:1448	Валера	t	f	ground	БЕЗ комиссии для покупателя и скрытых платежей !!!\r\n\r\nПродам участок 4.3 сотки, расположен в г. Севастополь, Гагаринский район, ТСН СНТ “Интернационалист”. Участок ровный, прямоугольной формы, без уклона.\r\n\r\nВнимание! Данная цена на участок актуальна исключительно с договором подряда на строительство!\r\nАккредитованный застройщик!\r\n\r\nКоммуникации:\r\n\r\nЭлектричество 3 фазы - по границе участка\r\n\r\nВода - в кооперативе своя скважина, вода круглогодичная\r\n\r\nУчасток расположен в районе с активной, современной жилой застройкой, соседи проживают круглогодично. Остановка, магазины в пешей доступности.\r\nДо СТ в 2024 году проложили качественную, асфальтированную дорогу.\r\nК участку проходит широкая , хорошо укатанная грунтовка, от асфальта 200 метров.\r\n\r\nСТ Интернационалист полностью окружен лесополосой, благодаря чему, воздух здесь чище, также лес частично защитит от фиолентовских ветров.\r\nВ лесу много белок, поют птицы. Прогулка в утренние часы с питомцами, доставит максимальное удовольствие любителям загородной жизни.\r\n\r\nИнфраструктура:\r\n\r\nУчасток находится в районе с развивающейся инфраструктурой, где в радиусе 5 км расположены: ТЦ, магазины, рынки, пляжи, детские сады, школы и т.п. Благодаря удобной транспортной развязке Фиолентовского кольца, вы быстро и без труда сможете доехать в любой район города.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы РФ. Проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.538966, 33.468119		
2	СТ Гераклея	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712754-76431547.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712755-178851175.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712758-237535716.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712760-530997585.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712761-558099891.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712765-632875403.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712766-316922485.jpeg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712770-362464033.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712773-99731455.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712774-659862987.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712777-712828282.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1749804712777-238797324.jpg}	4.2	2490000	91:01:014001:412	Виктор	f	t	ground	БЕЗ КОМИССИИ ДЛЯ ПОКУПАТЕЛЯ !!\r\n\r\nШикарный панорамный вид на горы и виноградники!!!\r\n\r\n4.2 cотки (CТ)\r\npасположeн в г. Сeвастопoль, TCH СТ “Геpaклeя”.\r\n\r\nУчaсток pовный, треугольной формы, без уклонa.\r\nХорошие и широкие подъездные пути.\r\n\r\nПoзвoните нaм, чтoбы узнать вce детали!\r\n\r\nKoммуникации:\r\n\r\nЭлeктpичеcтвo: по гpаницe участкa, вoзможнo пoдключeние\r\nВода: подача круглый год с собственной скважины кооператива\r\nКооператив, в котором находится участок, активно развивается.\r\nСоседи строятся и постоянно проживают.\r\n\r\nИнфраструктура:\r\n\r\nУчасток находится в районе с развивающейся инфраструктурой, где поблизости есть все необходимые социально значимые для жизни объекты.\r\nВ пешей доступности остановка общественного транспорта.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.511918, 33.544773		
12	Участок 6 соток в СТ Гранат	{https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199653-592030636.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199657-292316545.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199660-174315804.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199663-766645984.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199665-515158584.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199667-779712260.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199669-769763888.jpg,https://xn----92-53d6cjmsd6amk0d.xn--p1ai/api/uploads/image-1750925199670-658857902.JPG}	6	2950000	91:02:006020:1305	Виктор	t	f	ground	БЕЗ комиссии для покупателя и скрытых платежей !!!\r\n\r\nУчасток 5,9 сотки (СТ) в г. Севастополь, Гагаринский район, СТ “Гранат”. Участок правильной, квадратной формы с небольшим уклоном. Подъезд грунтовая дорога.\r\n\r\nПозвоните нам, чтобы узнать все детали!\r\n\r\nКоммуникации:\r\n— Электричество - 5 кВт по границе участка, в данный момент идет увеличение кооператива до 15 кВт\r\n— Вода - кооперативная, по границе, есть возможность сделать скважину\r\n— Канализация - потребуется септик\r\nУклон участка легко исправить с помощью спецтехники.\r\n\r\nУчасток находится на возвышенности, открывается красивый, панорамный вид.\r\n\r\nРядом находится лес.\r\nДо асфальтированной дороги 50 метров.\r\nТакже можно приобрести соседний участок 6 соток, что значительно расширяет возможности для строительства и ваших идей.\r\n\r\nИнфраструктура:\r\n\r\nДо Яшмового пляжа (Георгиевский монастырь), пляжа Баунти - 10 минут на автомобиле. Также в пешей доступности остановки общественного транспорта, регулярно курсируют маршруты № 3, 24, 35, 65, 79.\r\n\r\nПодходит для наличного расчета и под ипотеку.\r\n\r\nДокументы РФ. Проверены юристами и готовы к сделке.\r\n\r\nПрофессиональное сопровождение до получения права собственности.\r\n\r\nДобавьте предложение в закладки, чтобы не потерять!	44.534835, 33.481055		
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, role, "createdAt") FROM stdin;
1	ruslanmakhmatov@gmail.com	$2b$10$jw64QjX.kyXK4GgICLUeY.YmgiOivIMMDtyr7yNew9NO1qYFCCaSu	user	2025-06-11 20:35:58.496
10	ruslanmakhmatov2@gmail.com	$2b$10$KKhvjp/CV.FyAOkhWhnJEufEHP0qcSYH2N.QjvizX5pWU7bInmDTC	user	2025-06-12 08:17:35.339
11	ruslanmakhmatov3@gmail.com	$2b$10$McEg6QYo6D5gPs3wIGR3kuhWOJJeTRueedo7kY2aOpRZe1ilAVFI6	user	2025-06-12 08:18:02.353
2	v80505934163@yandex.ru	$2b$10$R8iF9QKdL3B/8u3AosvHiOItOnVSp353KGqS1BzEjiGK6A291uKoG	admin	2025-06-12 08:14:59.135
21	virtor2026@mail.ru	$2b$10$R82LkL7MXPhNpEljSS6WLuR5ZHcYpAlzNy1CYvGwUbD7Ag5qt32Ha	user	2025-06-12 13:06:27.392
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
381f8b86-083b-423c-83f1-ed25fc5dff60	c6b9a69b8c6dba815c08e9537a2c2f18b7e63d8d4bb773d64865b5464c510d4e	2025-06-05 15:25:23.702336+03	20250114094602_comparison_and_favorites	\N	\N	2025-06-05 15:25:23.672197+03	1
b021b418-2742-4d7f-87d9-293909ecc345	7f39f2d3ec459073c0a7643de323d37aea30c20ce95bd97123a9591e8e58643e	2025-06-05 15:25:23.709954+03	20250115153600_remove_name_for_comparison	\N	\N	2025-06-05 15:25:23.704484+03	1
76e63521-588d-43a9-92da-b1e31ecec14c	dd9bfc6be8ee96bab06a0722bf78dd75dc8cd67ff04cabdc19ae576262cb577c	2025-06-05 15:25:23.714928+03	20250121080033_add_link	\N	\N	2025-06-05 15:25:23.710979+03	1
7473788f-5a76-4627-93e1-2830a8526dfe	3e7481a3c98b30870f5927888393f428b02f6847e33fb5eb6a6da618d7737833	2025-06-05 15:25:23.724488+03	20250121113502_new_types	\N	\N	2025-06-05 15:25:23.716007+03	1
011446b4-8b28-4dfd-9f71-105cc2d42a20	792c604bc701817dc7eb2ab5fc0e47fa6d02e69f5ed3ddce756b572e1e15de43	2025-06-05 15:25:23.729476+03	20250127203155_details	\N	\N	2025-06-05 15:25:23.725721+03	1
\.


--
-- Name: ComparisonProperty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ComparisonProperty_id_seq"', 1, false);


--
-- Name: Comparison_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comparison_id_seq"', 1, false);


--
-- Name: Favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Favorite_id_seq"', 1, false);


--
-- Name: Property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Property_id_seq"', 14, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 27, true);


--
-- Name: ComparisonProperty ComparisonProperty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComparisonProperty"
    ADD CONSTRAINT "ComparisonProperty_pkey" PRIMARY KEY (id);


--
-- Name: Comparison Comparison_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comparison"
    ADD CONSTRAINT "Comparison_pkey" PRIMARY KEY (id);


--
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id);


--
-- Name: Property Property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: ComparisonProperty ComparisonProperty_comparisonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComparisonProperty"
    ADD CONSTRAINT "ComparisonProperty_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES public."Comparison"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ComparisonProperty ComparisonProperty_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComparisonProperty"
    ADD CONSTRAINT "ComparisonProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comparison Comparison_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comparison"
    ADD CONSTRAINT "Comparison_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favorite Favorite_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Favorite Favorite_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

