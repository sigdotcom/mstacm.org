import {MigrationInterface, QueryRunner} from "typeorm";

export class DynamicCommunities1599961667168 implements MigrationInterface {
    name = 'DynamicCommunities1599961667168'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sig" ADD "topic" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "website" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "email" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "discordLink" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "color" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "logoLink" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "logoLinkDark" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" ADD "display" boolean NOT NULL DEFAULT true`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = 'skyblue',
                                                  description = 'Interested in software engineering, web development, or development operations? In ACM Web, we build industry-grade websites using top software engineering practices. ACM Web is developing the https://mstacm.org/ website and much more. Moreover, we host workshops on various skills in web development, Typescript, and Git.',
                                                  "discordLink" = 'https://discord.gg/eKtkR4k',
                                                  email = 'acm@mst.edu',
                                                  "logoLink" = 'web.png',
                                                  "logoLinkDark" = 'web-dark.png',
                                                  website = 'https://mstacm.org'
                                                  WHERE name = 'Web'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = '#ff8888',
                                                  description = 'ACM Competition focuses on competitive programming, a mind-sport in which computer science problems are solved as quickly as possible. If you are interested in sharpening your algorithmic problem-solving skills, then this is the community for you.',
                                                  "discordLink" = 'https://discord.gg/4t954Ad',
                                                  email = 'acm@mst.edu',
                                                  "logoLink" = 'comp.png',
                                                  "logoLinkDark" = 'comp-dark.png',
                                                  website = 'https://comp.mstacm.org',
                                                  topic = 'Comp'
                                                  WHERE name = 'Competition'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = 'orange',
                                                  description = 'ACM Security helps develop the cybersecurity profession for the student body of Missouri University of Science and Technology by sponsoring high-quality workshops and lectures from both local and national industry professionals, as well as hosting on campus security events and competitions.',
                                                  "discordLink" = 'https://discord.gg/BfPyeHw',
                                                  email = 'sigsec@mst.edu',
                                                  "logoLink" = 'sec.png',
                                                  "logoLinkDark" = 'sec-dark.png',
                                                  website = 'https://acmsigsec.mstacm.org'
                                                  WHERE name = 'Security'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = 'pink',
                                                  description = 'ACM Game develops and hosts artificial intelligence programming competitions on S&T''s campus in Rolla, Missouri. We utilize many programming languages, tools and development strategies standard to the Computer Science Industry.  Our members gain valuable experience on one of our five development teams: Arena, Game, Public Relations, Visualizer, and Web. ACM Game offers experience working on a real team, with fellow students and mentors to learn and grow as a software developer. We accept new members of all skill levels and majors, so don''t hesitate to contact us.',
                                                  "discordLink" = 'https://discord.gg/xdXwxup',
                                                  email = 'siggame@mst.edu',
                                                  "logoLink" = 'game.png',
                                                  "logoLinkDark" = 'game-dark.png',
                                                  website = 'http://siggame.io'
                                                  WHERE name = 'Game'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = 'lavender',
                                                  description = 'ACM Data is a data focused org covering topics like Data Science, Data Mining, Data Analytics, and Data Engineering. Data Science, commonly seen as a combination of most data professions, is a new field with an infinite landscape. Our goal is to catalyze a new era of Data Science by using our curiosity to explore this landscape and push new standards. In ACM Data, we participate in competition sites such as Kaggle, tell stories using data, learn what’s new in Data Science, and whatever is necessary to be cutting edge.',
                                                  "discordLink" = 'https://discord.gg/pm2KJtt',
                                                  email = 'acm@mst.edu',
                                                  "logoLink" = 'data.png',
                                                  "logoLinkDark" = 'data-dark.png',
                                                  website = 'https://modata.blog'
                                                  WHERE name = 'Data'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = 'wheat',
                                                  description = 'ACM-W aims to facilitate a thriving community of women in computing through the organizing of great activities, networking, and mentorship programs. We aim to address the issue of retention of women in computer science by creating a support system for academic and professional pursuits and empowering our members to pursue their goals through knowledge and education about women''s contribution to technology. This group is open to all students (male or female) that wish to promote women in computing.',
                                                  "discordLink" = 'https://discord.gg/hh2wkmq',
                                                  email = 'acmw@mst.edu',
                                                  "logoLink" = 'acm-w.png',
                                                  "logoLinkDark" = 'acm-w-dark.png',
                                                  website = 'https://women.mstacm.org'
                                                  WHERE name = 'Women'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET color = 'aquamarine',
                                                  description = 'ACM Hack introduces students to the world of hackathons: weekend long events where students come together to turn ideas into reality. We organize travel and attendance to these events, which take place across the Midwest and the country.  We also run PickHacks, the annual student-run hackathon held at S&T in March. Alongside hackathons, we also host events about various design thinking concepts, hackathon preparation, and much more. Skill level and major doesn’t matter here — as long as you like building new things and meeting awesome people, ACM Hack is right for you.',
                                                  "discordLink" = 'https://discord.gg/zkwtu9p',
                                                  email = 'pickhacks@mst.edu',
                                                  "logoLink" = 'hack.png',
                                                  "logoLinkDark" = 'hack-dark.png',
                                                  website = 'https://pickhacks.io'
                                                  WHERE name = 'Hack'`, undefined);
        await queryRunner.query(`UPDATE "sig" SET email = 'acm@mst.edu',
                                                  website = 'mastacm.org',
                                                  display = FALSE
                                                  WHERE name = 'General'`, undefined);
        await queryRunner.query(`INSERT INTO "sig" (name, description, color, "discordLink", email, "logoLink", "logoLinkDark")
                                                    VALUES ('Arcade', 
                                                            'Focuses on improving and utilizing technical, and soft skills to create a game for the community''s arcade machine(s) on campus every semester/year. This community will also host game jams, so non-members can experience the game development process.',
                                                            'turquoise',
                                                            'https://discord.gg/RZCYUpT',
                                                            'acm@mst.edu',
                                                            'arcade.png',
                                                            'arcade-dark.png')`, undefined);
        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "display"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "logoLinkDark"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "logoLink"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "color"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "discordLink"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "email"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "website"`, undefined);
        await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "topic"`, undefined);
    }

}
