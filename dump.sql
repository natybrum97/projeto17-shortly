--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: cadastro; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cadastro (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: cadastro_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cadastro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cadastro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cadastro_id_seq OWNED BY public.cadastro.id;


--
-- Name: login; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login (
    id integer NOT NULL,
    token text NOT NULL,
    "idUser" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;


--
-- Name: url; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.url (
    id integer NOT NULL,
    short_url text NOT NULL,
    full_url text NOT NULL,
    "visitCount" integer DEFAULT 0,
    user_id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: url_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;


--
-- Name: cadastro id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cadastro ALTER COLUMN id SET DEFAULT nextval('public.cadastro_id_seq'::regclass);


--
-- Name: login id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- Name: url id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url ALTER COLUMN id SET DEFAULT nextval('public.url_id_seq'::regclass);


--
-- Data for Name: cadastro; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cadastro VALUES (1, 'nat', 'nat@gmail.com', '$2b$10$aTJejEn691b8xlPAOYvfXOhHNcVZ7KVVKvZat.NiIzq0VyDlSK3hu', '2023-08-04 04:18:59.884851');
INSERT INTO public.cadastro VALUES (2, 'natt', 'natt@gmail.com', '$2b$10$Rhe9WawE2cqRHkcwspaZruyqwxMmJAMFCZmPMnRrq7KhW0SYYlqru', '2023-08-04 04:19:15.314849');


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.login VALUES (1, '84ebc4bd-786c-475c-b1c2-b070d8a41a50', 1, '2023-08-04 04:19:22.351509');
INSERT INTO public.login VALUES (2, 'e4214f31-7505-4500-9d0d-59dc501dd834', 2, '2023-08-04 04:19:35.958686');
INSERT INTO public.login VALUES (3, '103b6957-be2d-4d42-9ad5-7940555fab12', 1, '2023-08-04 04:23:34.219259');
INSERT INTO public.login VALUES (4, '1458caeb-6a66-4f9d-945a-4299f5dfce13', 1, '2023-08-04 04:25:04.244325');
INSERT INTO public.login VALUES (5, '364eb826-499e-4cb8-b2a8-9aae0f63e320', 1, '2023-08-04 04:26:37.507552');
INSERT INTO public.login VALUES (6, '2e9605e9-2b64-487b-a789-94cdb8d4e1de', 1, '2023-08-04 04:32:27.460471');
INSERT INTO public.login VALUES (7, '08514769-8240-43fe-9f0f-df7d205e0a0a', 1, '2023-08-04 04:51:08.056923');


--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.url VALUES (1, '66XEuP', 'https://www.notion.so/bootcampra/Tutorial-Deploy-de-aplica-es-back-end-no-Render-PostgreSQL-5a66afbf04704944ba6a58dc1df16f1f', 0, 2, '2023-08-04 04:20:06.505844');
INSERT INTO public.url VALUES (3, 'AfeDZe', 'https://www.notion.so/bootcampra/Tutorial-Deploy-de-aplica-es-back-end-no-Render-PostgreSQL-5a66afbf04704944ba6a58dc1df16f1f', 0, 1, '2023-08-04 04:25:40.370515');
INSERT INTO public.url VALUES (4, 'NYpjM-', 'https://www.notion.so/bootcampra/Tutorial-Deploy-de-aplica-es-back-end-no-Render-PostgreSQL-5a66afbf04704944ba6a58dc1df16f1f', 0, 1, '2023-08-04 04:26:52.637859');
INSERT INTO public.url VALUES (5, 'e-D5OS', 'https://www.notion.so/bootcampra/Tutorial-Deploy-de-aplica-es-back-end-no-Render-PostgreSQL-5a66afbf04704944ba6a58dc1df16f1f', 0, 1, '2023-08-04 04:29:36.121059');
INSERT INTO public.url VALUES (2, '4RdVsY', 'https://www.notion.so/bootcampra/Tutorial-Deploy-de-aplica-es-back-end-no-Render-PostgreSQL-5a66afbf04704944ba6a58dc1df16f1f', 1, 1, '2023-08-04 04:25:16.509223');


--
-- Name: cadastro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cadastro_id_seq', 2, true);


--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.login_id_seq', 7, true);


--
-- Name: url_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.url_id_seq', 5, true);


--
-- Name: cadastro cadastro_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT cadastro_email_key UNIQUE (email);


--
-- Name: cadastro cadastro_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT cadastro_pkey PRIMARY KEY (id);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (id);


--
-- Name: login login_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT "login_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.cadastro(id);


--
-- Name: url url_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.cadastro(id);


--
-- PostgreSQL database dump complete
--

