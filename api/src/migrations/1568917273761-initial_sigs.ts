import { MigrationInterface, QueryRunner } from "typeorm";

export class initialSigs1568917273761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "sig"  ("name", "description")
                   VALUES ('Competition', 'ACM Competition focuses primarily on competitive programming. With weekly lectures from Dr. Morales we tackle challenge problems from many online judge websites such as Kattis (https://open.kattis.com/) and UVA (https://uva.onlinejudge.org/). We also hold our own programming contests on campus where people can win the admiration of their peers and some great prizes.'),
                          ('Data', 'ACM Data is a data focused org covering topics like Data Science, Data Mining, Data Analytics, and Data Engineering. Data Science, commonly seen as a combination of most data professions, is a new field with an infinite landscape. Our goal is to catalyze a new era of Data Science by using our curiosity to explore this landscape and push new standards. In ACM Data, we participate in competition sites such as Kaggle, tell stories using data, learn what''s new in Data Science, and whatever is necessary to be cutting edge.'),
                          ('Game', 'ACM Game develops and hosts artificial intelligence programming competitions on S&T''s campus in Rolla, Missouri. We utilize many programming languages, tools and development strategies standard to the Computer Science Industry. Our members gain valuable experience on one of our five development teams: Arena, Game, Public Relations, Visualizer, and Web. ACM Game offers experience working on a real team, with fellow students and mentors to learn and grow as a software developer. We accept new members of all skill levels and majors, so don''t hesitate to contact us.'),
                          ('Hack', 'ACM Hack introduces students to the world of hackathons: weekend long events where students come together to turn ideas into reality. We organize travel and attendance to these events, which take place across the Midwest and the country. We also run PickHacks, the annual student-run hackathon held at S&T in March. Alongside hackathons, we also host events about various design thinking concepts, hackathon preparation, and much more. Skill level and major doesn''t matter here — as long as you like building new things and meeting awesome people, ACM Hack is right for you.'),
                          ('Security', 'ACM Security helps develop the cybersecurity profession for the student body of Missouri University of Science and Technology by sponsoring high-quality workshops and lectures from both local and natinal industry professionals, as well as hosting on campus security events and competitions.'),
                          ('Web', 'Interested in software engineering, web development, or development operations? In ACM Web, we attempt to build production-grade websites using software engineering skills and development patterns with weekly development meetings. Currently, ACM Web is developing the https://acm.mst.edu/ website. Moreover, we host workshops on various foundational skills such as Python, Git, HTML, CSS, and many others.'),
                          ('Women', 'ACM-W aims to facilitate a thriving community of women in computing through the organizing of great activities, networking, and mentorship programs. We aim to address the issue of retention of women in computer science by creating a support system for academic and professional pursuits and empowering our members to pursue their goals through knowledge and education about women''s contribution to technology. This group is open to all students (male or female) that wish to promote women in computing.'),
                          ('General', 'Pretty cool')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE "sig"`);
  }
}
