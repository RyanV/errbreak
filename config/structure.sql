--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE notifications (
    id integer NOT NULL,
    message text,
    environment text,
    user_agent text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE notifications_id_seq OWNED BY notifications.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE schema_migrations (
    id integer NOT NULL,
    version text
);


--
-- Name: schema_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE schema_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: schema_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE schema_migrations_id_seq OWNED BY schema_migrations.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY notifications ALTER COLUMN id SET DEFAULT nextval('notifications_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations ALTER COLUMN id SET DEFAULT nextval('schema_migrations_id_seq'::regclass);


--
-- Name: notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
