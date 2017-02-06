var data_statements = [
    {
        id: 0,
        category: 0,
        category_str: "Bio",
        original: "Amelia was born in Mexico City on October 19th 1970. She graduated from a local High School and worked in her father’s small real estate business for four years. In November 1992 she moved to Boston in order to study economics there. After she graduated she moved in with her boyfriend Muhammad whom she knew from her first job as a consultant at LinkedIn. After some time, Amelia quit her job at LinkedIn and started to work for Adobe in a higher position. She became executive consultant there. By now, Amelia and Muhammad have a 14 years old daughter named Zoe and live in a small suburb just outside from Boston. Muhammad still works at LinkedIn.",
        sner: "[COMPANY_1] was born in [LOCATION_1] on [DATE/TIME_1]. She graduated from a local High School and worked in her father’s small real estate business for [DATE/TIME_2]. In [DATE/TIME_3] she moved to [LOCATION_3] in order to study economics there. After she graduated she moved in with her boyfriend [PERSON_1] whom she knew from her [NUMBER_1] job as a consultant at LinkedIn. After some time, [COMPANY_1] quit her job at LinkedIn and started to work for [COMPANY_2] in a higher position. She became executive consultant there. By now, [COMPANY_1] and [PERSON_1] have a [DATE/TIME_4] old daughter named Zoe and live in a small suburb just outside from [LOCATION_3]. [PERSON_1] still works at LinkedIn.",
        ukda: "XXX was born in XXX XXX on XXX 19th 1970. XXX graduated from a local XXX XXX and worked in her father’s small real estate business for four years. XXX XXX 1992 she moved to XXX in order to study economics there. XXX she graduated she moved in with her boyfriend XXX whom she knew from her first job as a consultant at XXX XXX some time  XXX quit her job at XXX and started to work for XXX in a higher position. XXX became executive consultant there. XXX now  XXX and XXX have a 14 years old daughter named XXX and live in a small suburb just outside from XXX XXX still works at XXX",
        human: "",
        choices: {
            choice1: "Main persons (1): Amelia</br>Cities (2): Mexico City; Boston</br>Dates (3): October 19, 1970; November 1992; 14 years</br>Additional persons (2): Zoe; Muhammad</br>Employers (2): LinkedIn; Adobe",
            choice2: "Main Persons (1): Hannah</br>Cities (2): Dublin; Taipei</br>Dates (3): September 10, 1975; July 1995; 4 years</br>Additional persons (2): Sam; Olliver</br>Employers (2): T-Mobile; Asus",
            choice3: "Main persons (1): Douglas</br>Cities (2): Amsterdam; Kansas City</br>Dates (3): November 5, 1978; October 2006; 5 years</br>Additional persons (2): Michael; Philip</br>Employers (2): Philips; Virgin Mobile",
            choice4: "Main persons (1): Mary</br>Cities (2): Washington DC; Vancouver</br>Dates (3): March 8, 1981; September 2001; 8 years</br>Additional persons (2): Sebastian; Cody</br>Employers (2): IBM; Sony",
            correct: 1
        }
    },
    {
        id: 1,
        category: 0,
        category_str: "Bio",
        original: "Thomas was born on August 4, 1961 in Los Angeles. After graduating from high school he moved to New York City because he was accepted at a local university. In November 1980 he met Lisa and he married her 3 years later. At that time he also started working at Microsoft. He learned a lot in his career as a leader of many project teams. After a while he got a job offer at AT&T from Jennifer. A woman he met in his career as a project leader. She saw a big potential in his skills. He decided to take the job and now works as a manager of the technician department.",
        sner: "[PERSON_1] was born on [DATE/TIME_1] in [LOCATION_1]. After graduating from high school he moved to [LOCATION_2] because he was accepted at a local university. In [DATE/TIME_2] he met [PERSON_2] and he married her [DATE/TIME_3]. At that time he also started working at [COMPANY_1]. He learned a lot in his career as a leader of many project teams. After a while he got a job offer at [COMPANY_2] from [PERSON_3]. A [PERSON_4] he met in his career as a project leader. She saw a big potential in his skills. He decided to take the job and [DATE/TIME_5] works as a manager of the [COMPANY_3].",
        ukda: "XXX was born on XXX 4  1961 in XXX XXX XXX graduating from high school he moved to XXX XXX XXX because he was accepted at a local university. XXX XXX 1980 he met XXX and he married her 3 years later. XXX that time he also started working at XXX XXX learned a lot in his career as a leader of many project teams. XXX a while he got a job offer at XXX from XXX XXX woman he met in his career as a project leader. XXX saw a big potential in his skills. XXX decided to take the job and now works as a manager of the technician department.",
        human: "",
        choices: {
            choice1: "Main Persons (1): Thomas</br>Cities (2): Los Angeles; New York City</br>Dates (3): August 4, 1961; November 1980; 3 years</br>Additional persons (2): Lisa; Jennifer</br>Employers (2): Microsoft; AT&T",
            choice2: "Main persons (1): Lucas</br>Cities (2): Seattle; Tokyo</br>Dates (3): May 7, 1985; June 2010; 1 year</br>Additional persons (2): Ella; Daniel</br>Employers (2): Canon; JVC",
            choice3: "Main persons (1): Nathan</br>Cities (2): San Francisco; Singapore</br>Dates (3): June 13, 1970; August 1995; 10 years</br>Additional persons (2): Juan; Lily</br>Employers (2): Facebook; Netflix",
            choice4: "Main persons (1): Andrew</br>Cities (2): London; Seoul</br>Dates (3): February 20, 1973; January 1996; 11 years</br>Additional persons (2): Noah; Olivia</br>Employers (2): Yahoo; LG",
            correct: 1
        }
    },
    {
        id: 2,
        category: 0,
        category_str: "Bio",
        original: "Sophia was born on April 15, 1980. She wasn’t a very bright girl, though everybody loved her. She went to Toronto in April 2006 to live with her boyfriend Alexander who wasn’t very smart either. She got a job as a concierge at Blackberry. Even though everybody liked her personality she wasn’t very good at her job, so she got fired. Sophia and Alexander moved to Atlanta because of better job opportunities. After many solicitations she finally got a job as a deliveryman at Amazon. She had a steady income so she tried to have a baby. After 7 years she finally got pregnant. She named her newborn baby Jayden.",
        sner: "[PERSON_1] was born on [DATE/TIME_1]. She wasn’t a very bright [PERSON_2], though everybody loved her. She went to [LOCATION_1] in [DATE/TIME_2] to live with her boyfriend [PERSON_3] who wasn’t very smart either. She got a job as a concierge at Blackberry. Even though everybody liked her personality she wasn’t very good at her job, so she got fired. [PERSON_1] and [PERSON_3] moved to [LOCATION_2] because of better job opportunities. After many solicitations she finally got a job as a deliveryman at [LOCATION_3]. She had a steady income so she tried to have a baby. After [DATE/TIME_3] she finally got pregnant. She named her newborn baby [PERSON_4].",
        ukda: "XXX was born on XXX 15  1980. XXX wasn’t a very bright girl  though everybody loved her. XXX went to XXX in XXX 2006 to live with her boyfriend XXX who wasn’t very smart either. XXX got a job as a concierge at XXX XXX though everybody liked her personality she wasn’t very good at her job  so she got fired. XXX and XXX moved to XXX because of better job opportunities. XXX many solicitations she finally got a job as a deliveryman at XXX XXX had a steady income so she tried to have a baby. XXX 7 years she finally got pregnant. XXX named her newborn baby XXX",
        human: "",
        choices: {
            choice1: "Main persons (1): Sophia</br>Cities (2): Toronto; Atlanta</br>Dates (3): April 15, 1980; April 2006; 7 years</br>Additional persons (2): Jayden; Alexander</br>Employers (2): BlackBerry; Amazon",
            choice2: "Main persons (1): Mia</br>Cities (2): Helsinki; Berlin</br>Dates (3): January 28, 1986; February 2001; 2 years</br>Additional persons (2): Ronald; William</br>Employers (2): Nokia; Siemens",
            choice3: "Main persons (1): Charlotte,Cities (2): Brussels; Kyoto</br>Dates (3): October 1, 1974; November 1994; 16 years</br>Additional persons (2): Madison; Melissa</br>Employers (2): Google; Nintendo",
            choice4: "Main persons (1): Owen</br>Cities (2): Munich; Copenhagen</br>Dates (3): December 31, 1965; July 1990; 15 years</br>Additional persons (2): Harry; Matthew</br>Employers (2):Toshiba; Apple",
            correct: 1
        }
    },
    {
        id: 3,
        category: 0,
        category_str: "Bio",
        original: "Isabelle is living in Austin. She originally comes from Barcelona where she was born on July 30, 1979. After her studies she started working for Packard Bell until she moved to Austin in October 2004. She started working at Dell in the marketing department. After 12 years of working at Dell, the manager at her department, Charlie, was going to retire. The upcoming months towards Charlie’s retirement day, she worked hard to prove she was capable to replace Charlie. Unfortunately, Dell chose to hire someone from outside the company, Logan. Accidentally, Isabella knew him from the time she was working at Packard Bell. But back then he was an intern. Isabella was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        sner: "[PERSON_1] is living in [LOCATION_1]. She originally comes from [LOCATION_2] where she was born on [DATE/TIME_1]. After her studies she started working for [COMPANY_1] until she moved to [LOCATION_1] in [DATE/TIME_2]. She started working at [COMPANY_2] in the [COMPANY_3]. After [DATE/TIME_3] of working at [COMPANY_2], the manager at her department, [PERSON_2], was going to retire. The upcoming [DATE/TIME_4] towards [PERSON_2]’s retirement [DATE/TIME_5], she worked hard to prove she was capable to replace [PERSON_2]. Unfortunately, [COMPANY_2] chose to hire [PERSON_4] from outside the company, [LOCATION_3]. Accidentally, [PERSON_5] knew him from the time she was working at [COMPANY_1]. But back then he was an intern. [PERSON_5] was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        ukda: "XXX is living in XXX XXX originally comes from XXX where she was born on XXX 30  1979. XXX her studies she started working for XXX XXX until she moved to XXX in XXX 2004. XXX started working at XXX in the marketing department. XXX 12 years of working at XXX the manager at her department  XXX was going to retire. XXX upcoming months towards XXX retirement day  she worked hard to prove she was capable to replace XXX XXX XXX chose to hire someone from outside the company  XXX XXX XXX knew him from the time she was working at XXX XXX XXX back then he was an intern. XXX was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        human: "",
        choices: {
            choice1: "Main persons (1): Isabella</br>Cities (2): Austin; Barcelona</br>Dates (3): July 30, 1979; October 2004; 12 years</br>Additional persons (2): Logan; Charlie</br>Employers (2): Dell; Packard Bell",
            choice2: "Main persons (1): Edward</br>Cities (2): Chicago; Dallas</br>Dates (3): November 4, 1982; September 1996; 6 years</br>Additional persons (2): Ava; Sophie</br>Employers (2): eBay; Panasonic",
            choice3: "Main persons (1): James</br>Cities (2): Dubai; Kuala Lumpur</br>Dates (3): July 17, 1984; May 2007; 9 years</br>Additional persons (2): Benjamin; Aiden</br>Employers (2): Twitter; YouTube",
            choice4: "Main persons (1): Abigail</br>Cities (2): Beijing; Shanghai</br>Dates (3): September 16, 1980; September 2003; 13 years</br>Additional persons (2): Emma; Jacob</br>Employers (2): Samsung; HTC",
            correct: 1
        }
    },
    {
        id: 4,
        category: 1,
        category_str: "Travel",
        original: "It was a cold rainy day in December 2016 when Daniel departed by train from London. He was curious how the reunion between him and Harry was going to be like. One week ago, Daniel and Harry left each other when they were in Manchester. They had a fight over their friend Peter who had been trying to drive them apart during a sleepover at his place in Liverpool. Because a holiday break was coming soon and they would be spending time together, Harry and Daniel had decided to meet up. Two days earlier they talked on the phone to talk things over. They would meet in Leeds so they could start their friendship with a clean slate in the holiday that was coming.",
        sner: "It was a cold rainy [DATE/TIME_1] when [PERSON_1] departed by train from [LOCATION_1]. He was curious how the reunion between him and [PERSON_2] was going to be like. [DATE/TIME_3], [PERSON_1] and [PERSON_2] left each other when they were in [LOCATION_2]. They had a fight over their friend [PERSON_3] who had been trying to drive them apart during a sleepover at his place in [LOCATION_3]. Because a holiday break was coming soon and they would be spending time together, [PERSON_2] and [PERSON_1] had decided to meet up. [DATE/TIME_4] earlier they talked on the phone to talk things over. They would meet in [LOCATION_4] so they could start their friendship with a clean slate in the holiday that was coming.",
        ukda: "XXX was a cold rainy day in XXX 2016 when XXX departed by train from XXX XXX was curious how the reunion between him and XXX was going to be like. XXX week ago  XXX and XXX left each other when they were in XXX XXX had a fight over their friend XXX who had been trying to drive them apart during a sleepover at his place in XXX XXX a holiday break was coming soon and they would be spending time together  XXX and XXX had decided to meet up. XXX days earlier they talked on the phone to talk things over. XXX would meet in XXX so they could start their friendship with a clean slate in the holiday that was coming.",
        human: "",
        choices: {
            choice1: "Main persons (2): Daniel; Harry</br>Cities (4): London; Manchester; Liverpool; Leeds</br>Dates (3): December 2016; 1 week; 2 days</br>Additional persons (1): Peter",
            choice2: "Main persons (2): Fred; Ronald</br>Cities (4): Paris; Bordeaux; Montpellier; Marseille</br>Dates (3): August 2014; 5 weeks; 4 days</br>Additional persons (1): Julie",
            choice3: "Main persons (2): Mary; James</br>Cities (4): Malaga; Rabat; Casablanca; Marrakesh</br>Dates (3) June 2012; 2 weeks; 8 days</br>Additional persons (1): Edward",
            choice4: "Main persons (2): Elizabeth; Andrew</br>Cities (4): Oslo; Stockholm; Gothenburg; Copenhagen</br>Dates (3): September 2016; 1 month; 5 days</br>Additional persons (1): John",
            correct: 1
        }
    },
    {
        id: 5,
        category: 1,
        category_str: "Travel",
        original: "Charlotte and Matthew were in the final stage of their trip. They had 15 weeks in total but had to catch their flight from Buenos Aires in 16 days. They had been seeing Brasilia and Salvador already and did not plan to visit other cities for a longer period of time. But they were out of money when they got to Sao Paulo and things got different. Owen, the owner of the hotel where they had been staying would not let them leave before they paid everything. He kept their passports until they had been doing the dishes for long enough to pay for their bill. It was not before October 2013 that Charlotte and Matthew could finally leave, but they were too late already to catch their flight home.",
        sner: "[LOCATION_1] and [PERSON_1] were in the final stage of their trip. They had [DATE/TIME_1] in total but had to catch their flight from [COMPANY_1] in [DATE/TIME_2]. They had been seeing [LOCATION_2] and [PERSON_2] already and did not plan to visit other cities for a longer period of time. But they were out of money when they got to [LOCATION_3] and things got different. [PERSON_3], the owner of the hotel where they had been staying would not let them leave before they paid everything. He kept their passports until they had been doing the dishes for long enough to pay for their [PERSON_4]. It was not before [DATE/TIME_3] that [LOCATION_1] and [PERSON_1] could finally leave, but they were too late already to catch their flight home.",
        ukda: "XXX and XXX were in the final stage of their trip. XXX had 15 weeks in total but had to catch their flight from XXX XXX in 16 days. XXX had been seeing XXX and XXX already and did not plan to visit other cities for a longer period of time. XXX they were out of money when they got to XXX XXX and things got different. XXX the owner of the hotel where they had been staying would not let them leave before they paid everything. XXX kept their passports until they had been doing the dishes for long enough to pay for their bill. XXX was not before XXX 2013 that XXX and XXX could finally leave  but they were too late already to catch their flight home.",
        human: "",
        choices: {
            choice1: "Travel scenario 16, Main persons (2): Matthew; Charlotte</br>Cities (4): Brasilia; Salvador; Sao Paulo; Buenos Aires</br>Dates (3): October 2013; 15 weeks; 16 days</br>Additional persons (1): Owen",
            choice2: "Main persons (2): Olivia; Muhammad</br>Cities (4): Bilbao; Barcelona; Madrid; Valencia</br>Dates (3): September 2012; 3 weeks; 6 days</br>Additional persons (1): Juan",
            choice3: "Main persons (2): Charlie; Noah</br>Cities (4): Geneva; Zurich; Bern; Milan</br>Dates (3): December 2016; 4 weeks; 7 days</br>Additional persons (1): Amelia",
            choice4: "Main persons (2): Emily; Ava</br>Cities (4): Bologna; Florence; Rome; Naples</br>Dates (3): July 2014; 7 weeks; 11 days</br>Additional persons (1): Jack",
            correct: 1
        }
    },
    {
        id: 6,
        category: 1,
        category_str: "Travel",
        original: "Lily and Sophia wanted to go on a holiday in June 2014. The trip of Lily and Sophia started in Porto. The cathedral looked like the one in Lisbon, where they had been before. For the next 21 days, they were going to Faro as well. Albufeira was planned for the last 10 days of their trip, where they would meet Ethan. Ethan is the boyfriend of Lily and works in Albufeira as a bartender. Albufeira is a city that never sleeps, they heard. So after those days full of exploring, walking and culture they were looking forward to dance. At the end of the holiday they thought happily about the trip. They want to go to on a holiday together again.",
        sner: "[PERSON_1] and [PERSON_2] wanted to go on a holiday in [DATE/TIME_1]. The trip of [PERSON_1] and [PERSON_2] started in [LOCATION_1]. The cathedral looked like the [NUMBER_1] in [LOCATION_2], where they had been before. For the next 21 [DATE/TIME_2], they were going to Faro as well. [LOCATION_3] was planned for the last 10 [DATE/TIME_2] of their trip, where they would meet [PERSON_3]. [PERSON_3] is the boyfriend of [PERSON_1] and works in [LOCATION_3] as a bartender. [LOCATION_3] is a city that never sleeps, they heard. So after those [DATE/TIME_2] full of exploring, walking and culture they were looking forward to dance. At the end of the holiday they thought happily about the trip. They want to go to on a holiday together again.",
        ukda: "XXX and XXX wanted to go on a holiday in XXX 2014. XXX trip of XXX and XXX started in XXX XXX cathedral looked like the one in XXX where they had been before. XXX the next 21 days  they were going to XXX as well. XXX was planned for the last 10 days of their trip  where they would meet XXX XXX is the boyfriend of XXX and works in XXX as a bartender. XXX is a city that never sleeps  they heard. XXX after those days full of exploring  walking and culture they were looking forward to dance. XXX the end of the holiday they thought happily about the trip. XXX want to go to on a holiday together again.",
        human: "",
        choices: {
            choice1: "Main persons (2): Lily; Sophia</br>Cities (4): Porto; Lisbon; Faro; Albufeira</br>Dates (3): June 2014; 21 days; 10 days</br>Additional persons (1): Ethan",
            choice2: "Main persons (2): Isabella; Lauren</br>Cities (4): Stuttgart; Munich; Salzburg; Vienna</br>Dates (3): June 2015; 17 days; 9 days</br>Additional persons (1): Henry",
            choice3: "Main persons (2): Emma; Zoe</br>Cities (4): Mumbai; Jaipur; New Delhi; Kathmandu</br>Dates (3): May 2015; 4 months; 9 weeks</br>Additional persons (1): Aiden",
            choice4: "Main persons (2): Mia; Madison</br>Cities (4): Bangkok; Phnom Penh; Ho Chi Minh City; Hanoi</br>Dates (3): January 2013; 5 months; 11 weeks; 12 days</br>Additional persons (1): Lucas",
            correct: 1
        }
    },
    {
        id: 7,
        category: 1,
        category_str: "Travel",
        original: "Jacob and Melissa have been friends since high school. In July 2015 they were traveling together for 6 weeks. This was their dream since they had been kids. They then began the trip in Quito and went to Lima, Cuzco and Santiago. Along the way they have occasionally been unlucky. For instance, Melissa lost her debit card the when they arrived in Quito and 3 days later Jacob tore his ankle during a hike to a waterfall. Nevertheless they could laugh about it. During the trip they met Nathan. They became friends and he joined them. Besides that it was very nice, it also gave benefits. They could rent a car and they did. It was the best time of their lives.",
        sner: "[PERSON_1] and [PERSON_2] have been friends since high school. In [DATE/TIME_1] they were traveling together for [DATE/TIME_2]. This was their dream since they had been kids. They then began the trip in [LOCATION_1] and went to [LOCATION_2], [LOCATION_3] and [LOCATION_4]. Along the way they have occasionally been unlucky. For instance, [PERSON_2] lost her debit card the when they arrived in [LOCATION_1] and [DATE/TIME_3] later [PERSON_1] tore his ankle during a hike to a waterfall. Nevertheless they could laugh about it. During the trip they met [PERSON_3]. They became friends and he joined them. Besides that it was very nice, it also gave benefits. They could rent a car and they did. It was the best time of their lives.",
        ukda: "XXX and XXX have been friends since high school. XXX XXX 2015 they were traveling together for 6 weeks. XXX was their dream since they had been kids. XXX then began the trip in XXX and went to XXX XXX and XXX XXX the way they have occasionally been unlucky. XXX instance  XXX lost her debit card the when they arrived in XXX and 3 days later XXX tore his ankle during a hike to a waterfall. XXX they could laugh about it. XXX the trip they met XXX XXX became friends and he joined them. XXX that it was very nice  it also gave benefits. XXX could rent a car and they did. XXX was the best time of their lives.",
        human: "",
        choices: {
            choice1: "Main persons (2): Jacob; Melissa</br>Cities (4): Quito; Cuzco; Lima; Santiago</br>Dates (3): July 2015; 6 weeks; 3 days</br>Additional persons (1): Nathan",
            choice2: "Main persons (2): Ella; Abigail</br>Cities (4): Taipei; Hong Kong; Shanghai; Beijing</br>Dates (3): April 2013; 3 months; 13 days</br>Additional persons (1): Jayden",
            choice3: "Main persons (2): Logan; Benjamin</br>Cities (4): Brisbane; Sydney; Melbourne; Perth</br>Dates (3): July 2012; 6 months; 14 days</br>Additional persons (1): Hannah",
            choice4: "Main persons (2): William; Michael</br>Cities (4): Panama City; Medellín; Bogotá; Caracas</br>Dates (3): August 2012; 14 weeks; 15 days</br>Additional persons (1): Alexander",
            correct: 1
        }
    }
];


