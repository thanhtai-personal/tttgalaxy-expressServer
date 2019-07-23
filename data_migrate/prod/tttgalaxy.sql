-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id uuid NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "firstName" character varying(30)[] COLLATE pg_catalog."default",
    "lastName" character varying(30)[] COLLATE pg_catalog."default",
    "comeFrom" text COLLATE pg_catalog."default",
    "birthDay" timestamp without time zone,
    age bigint,
    phone character varying(15)[] COLLATE pg_catalog."default",
    "isDelete" boolean,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to xwlmrkzbcrnoxp;
	
-- Table: public.skills

-- DROP TABLE public.skills;

CREATE TABLE public.skills
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    name character varying(128) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT skills_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.skills
    OWNER to xwlmrkzbcrnoxp;

-- Table: public.schools

-- DROP TABLE public.schools;

CREATE TABLE public.schools
(
    id uuid NOT NULL,
    name text COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    description text COLLATE pg_catalog."default",
    CONSTRAINT schools_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.schools
    OWNER to xwlmrkzbcrnoxp;
	
-- Table: public."group"

-- DROP TABLE public."group";

CREATE TABLE public."group"
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    name character varying(128) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT group_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."group"
    OWNER to xwlmrkzbcrnoxp;
	
-- Table: public.experiences

-- DROP TABLE public.experiences;

CREATE TABLE public.experiences
(
    id uuid NOT NULL,
    name character varying(128)[] COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    title text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    "from" timestamp without time zone,
    "to" timestamp without time zone,
    "isPresent" boolean,
    "isDelete" boolean,
    CONSTRAINT experience_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.experiences
    OWNER to xwlmrkzbcrnoxp;
	

	
-- Table: public.educations

-- DROP TABLE public.educations;

CREATE TABLE public.educations
(
    id uuid NOT NULL,
    name character varying(128)[] COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    title text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    "from" timestamp without time zone,
    "to" timestamp without time zone,
    "isPresent" boolean,
    "isDelete" boolean,
    CONSTRAINT educations_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.educations
    OWNER to xwlmrkzbcrnoxp;
	
	
-- Table: public.companies

-- DROP TABLE public.companies;

CREATE TABLE public.companies
(
    id uuid NOT NULL,
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    CONSTRAINT companies_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.companies
    OWNER to xwlmrkzbcrnoxp;
	
-- Table: public.company_experience

-- DROP TABLE public.company_experience;

CREATE TABLE public.company_experience
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    "experienceId" uuid NOT NULL,
    "companyId" uuid NOT NULL,
    CONSTRAINT company_experience_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_companyExperience_company" FOREIGN KEY ("companyId")
        REFERENCES public.companies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_companyExperience_experience" FOREIGN KEY ("experienceId")
        REFERENCES public.experiences (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.company_experience
    OWNER to xwlmrkzbcrnoxp;

COMMENT ON CONSTRAINT "fk_companyExperience_company" ON public.company_experience
    IS 'fk_companyExperience_company';

-- Index: fki_fk_companyExperience_company

-- DROP INDEX public."fki_fk_companyExperience_company";

CREATE INDEX "fki_fk_companyExperience_company"
    ON public.company_experience USING btree
    ("companyId")
    TABLESPACE pg_default;

-- Index: fki_fk_companyExperience_experience

-- DROP INDEX public."fki_fk_companyExperience_experience";

CREATE INDEX "fki_fk_companyExperience_experience"
    ON public.company_experience USING btree
    ("experienceId")
    TABLESPACE pg_default;
	
-- Table: public.education_school

-- DROP TABLE public.education_school;

CREATE TABLE public.education_school
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" timestamp without time zone,
    "educationId" uuid NOT NULL,
    "schoolId" uuid NOT NULL,
    CONSTRAINT education_school_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_educationSchool_education" FOREIGN KEY ("educationId")
        REFERENCES public.educations (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_educationSchool_school" FOREIGN KEY ("schoolId")
        REFERENCES public.schools (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.education_school
    OWNER to xwlmrkzbcrnoxp;

-- Index: fki_fk_educationSchool_education

-- DROP INDEX public."fki_fk_educationSchool_education";

CREATE INDEX "fki_fk_educationSchool_education"
    ON public.education_school USING btree
    ("educationId")
    TABLESPACE pg_default;

-- Index: fki_fk_educationSchool_school

-- DROP INDEX public."fki_fk_educationSchool_school";

CREATE INDEX "fki_fk_educationSchool_school"
    ON public.education_school USING btree
    ("schoolId")
    TABLESPACE pg_default;
	
-- Table: public.group_skill

-- DROP TABLE public.group_skill;

CREATE TABLE public.group_skill
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    "skillId" uuid NOT NULL,
    "groupId" uuid NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT group_skill_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_groupSkill_group" FOREIGN KEY ("groupId")
        REFERENCES public."group" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_groupSkill_skill" FOREIGN KEY ("skillId")
        REFERENCES public.skills (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.group_skill
    OWNER to xwlmrkzbcrnoxp;

-- Index: fki_fk_groupSkill_group

-- DROP INDEX public."fki_fk_groupSkill_group";

CREATE INDEX "fki_fk_groupSkill_group"
    ON public.group_skill USING btree
    ("groupId")
    TABLESPACE pg_default;

-- Index: fki_fk_groupSkill_skill

-- DROP INDEX public."fki_fk_groupSkill_skill";

CREATE INDEX "fki_fk_groupSkill_skill"
    ON public.group_skill USING btree
    ("skillId")
    TABLESPACE pg_default;
	

	
-- Table: public.user_education

-- DROP TABLE public.user_education;

CREATE TABLE public.user_education
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    "userId" uuid NOT NULL,
    "educationId" uuid NOT NULL,
    CONSTRAINT user_education_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_userEducation_education" FOREIGN KEY ("educationId")
        REFERENCES public.educations (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_userEducation_user" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_education
    OWNER to xwlmrkzbcrnoxp;

-- Index: fki_fk_userEducation_education

-- DROP INDEX public."fki_fk_userEducation_education";

CREATE INDEX "fki_fk_userEducation_education"
    ON public.user_education USING btree
    ("educationId")
    TABLESPACE pg_default;

-- Index: fki_fk_userEducation_user

-- DROP INDEX public."fki_fk_userEducation_user";

CREATE INDEX "fki_fk_userEducation_user"
    ON public.user_education USING btree
    ("userId")
    TABLESPACE pg_default;
	
	
-- Table: public.user_experience

-- DROP TABLE public.user_experience;

CREATE TABLE public.user_experience
(
    id uuid NOT NULL,
    "isDelete" boolean,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "userId" uuid NOT NULL,
    "experienceId" uuid NOT NULL,
    CONSTRAINT user_experience_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_userExperience_experience" FOREIGN KEY ("experienceId")
        REFERENCES public.experiences (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_userExperience_user" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_experience
    OWNER to xwlmrkzbcrnoxp;

-- Index: fki_fk_userExperience_experience

-- DROP INDEX public."fki_fk_userExperience_experience";

CREATE INDEX "fki_fk_userExperience_experience"
    ON public.user_experience USING btree
    ("experienceId")
    TABLESPACE pg_default;

-- Index: fki_fk_userExperience_user

-- DROP INDEX public."fki_fk_userExperience_user";

CREATE INDEX "fki_fk_userExperience_user"
    ON public.user_experience USING btree
    ("userId")
    TABLESPACE pg_default;
	

-- Table: public.user_skill

-- DROP TABLE public.user_skill;

CREATE TABLE public.user_skill
(
    id uuid NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "isDelete" boolean,
    "userId" uuid NOT NULL,
    "skillId" uuid NOT NULL,
    progress bigint,
    description text COLLATE pg_catalog."default",
    CONSTRAINT user_skill_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_userSkill_skill" FOREIGN KEY ("skillId")
        REFERENCES public.skills (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "fk_userSkill_user" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_skill
    OWNER to xwlmrkzbcrnoxp;

-- Index: fki_fk_userSkill_skill

-- DROP INDEX public."fki_fk_userSkill_skill";

CREATE INDEX "fki_fk_userSkill_skill"
    ON public.user_skill USING btree
    ("skillId")
    TABLESPACE pg_default;

-- Index: fki_fk_userSkill_user

-- DROP INDEX public."fki_fk_userSkill_user";

CREATE INDEX "fki_fk_userSkill_user"
    ON public.user_skill USING btree
    ("userId")
    TABLESPACE pg_default;


	