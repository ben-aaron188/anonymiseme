var data_statements = [
    {
        id: 0,
        category: 0,
        category_str: "Bio",
        original: "Amelia was born in Mexico City on October 19th 1970. She graduated from a local High School and worked in her father’s small real estate business for four years. In November 1992 she moved to Boston in order to study economics there. After she graduated she moved in with her boyfriend Muhammad whom she knew from her first job as a consultant at LinkedIn. After some time, Amelia quit her job at LinkedIn and started to work for Adobe in a higher position. She became executive consultant there. By now, Amelia and Muhammad have a 14 years old daughter named Zoe and live in a small suburb just outside from Boston. Muhammad still works at LinkedIn.",
        sner: "[COMPANY_1] was born in [LOCATION_1] on [DATETIME_1]. She graduated from a local High School and worked in her father’s small real estate business for [DATETIME_2]. In [DATETIME_3] she moved to [LOCATION_3] in order to study economics there. After she graduated she moved in with her boyfriend [PERSON_1] whom she knew from her [NUMBER_1] job as a consultant at LinkedIn. After some time, [COMPANY_1] quit her job at LinkedIn and started to work for [COMPANY_2] in a higher position. She became executive consultant there. By now, [COMPANY_1] and [PERSON_1] have a [DATETIME_4] old daughter named Zoe and live in a small suburb just outside from [LOCATION_3]. [PERSON_1] still works at LinkedIn.",
        ukda: "XXX was born in XXX XXX on XXX 19th 1970. XXX graduated from a local XXX XXX and worked in her father’s small real estate business for four years. XXX XXX 1992 she moved to XXX in order to study economics there. XXX she graduated she moved in with her boyfriend XXX whom she knew from her first job as a consultant at XXX XXX some time  XXX quit her job at XXX and started to work for XXX in a higher position. XXX became executive consultant there. XXX now  XXX and XXX have a 14 years old daughter named XXX and live in a small suburb just outside from XXX XXX still works at XXX",
        human: "[PERSON_1] was born in [LOCATION_1] on [DATETIME_1]. She graduated from a local High School and worked in her father’s small real estate business for four years. In [DATETIME_2] she moved to [LOCATION_2] in order to study economics there. After she graduated she moved in with her boyfriend [PERSON_2] whom she knew from her first job as a consultant at [ORGANIZATION_1]. After some time, [PERSON_1] quit her job at [ORGANIZATION_1] and started to work for [ORGANIZATION_2] in a higher position. She became executive consultant there. By now, [PERSON_1] and [PERSON_2] have a [DATETIME_3] old daughter named [PERSON_3] and live in a small suburb just outside from [LOCATION_2]. [PERSON_2] still works at [ORGANIZATION_1].",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Hannah</br><u>Cities:</u> Dublin; Taipei</br><u>Dates:</u> September 10, 1975; July 1995; 4 years</br><u>Additional persons:</u> Sam; Olliver</br><u><u>Employers:</u></u> T-Mobile; Asus",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Amelia</br><u>Cities:</u> Mexico City; Boston</br><u>Dates:</u> October 19, 1970; November 1992; 14 years</br><u>Additional persons:</u> Zoe; Muhammad</br><u><u>Employers:</u></u> LinkedIn; Adobe",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Douglas</br><u>Cities:</u> Amsterdam; Kansas City</br><u>Dates:</u> November 5, 1978; October 2006; 5 years</br><u>Additional persons:</u> Michael; Philip</br><u><u>Employers:</u></u> Philips; Virgin Mobile",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Mary</br><u>Cities:</u> Washington DC; Vancouver</br><u>Dates:</u> March 8, 1981; September 2001; 8 years</br><u>Additional persons:</u> Sebastian; Cody</br><u><u>Employers:</u></u> IBM; Sony",
            correct: 2
        }
    },
    {
        id: 1,
        category: 0,
        category_str: "Bio",
        original: "Thomas was born on August 4, 1961 in Los Angeles. After graduating from high school he moved to New York City because he was accepted at a local university. In November 1980 he met Lisa and he married her 3 years later. At that time he also started working at Microsoft. He learned a lot in his career as a leader of many project teams. After a while he got a job offer at AT&T from Jennifer. A woman he met in his career as a project leader. She saw a big potential in his skills. He decided to take the job and now works as a manager of the technician department.",
        sner: "[PERSON_1] was born on [DATETIME_1] in [LOCATION_1]. After graduating from high school he moved to [LOCATION_2] because he was accepted at a local university. In [DATETIME_2] he met [PERSON_2] and he married her [DATETIME_3]. At that time he also started working at [COMPANY_1]. He learned a lot in his career as a leader of many project teams. After a while he got a job offer at [COMPANY_2] from [PERSON_3]. A [PERSON_4] he met in his career as a project leader. She saw a big potential in his skills. He decided to take the job and [DATETIME_5] works as a manager of the [COMPANY_3].",
        ukda: "XXX was born on XXX 4  1961 in XXX XXX XXX graduating from high school he moved to XXX XXX XXX because he was accepted at a local university. XXX XXX 1980 he met XXX and he married her 3 years later. XXX that time he also started working at XXX XXX learned a lot in his career as a leader of many project teams. XXX a while he got a job offer at XXX from XXX XXX woman he met in his career as a project leader. XXX saw a big potential in his skills. XXX decided to take the job and now works as a manager of the technician department.",
        human: "[PERSON_1] was born on [DATETIME_1] in [LOCATION_1]. After graduating from high school he moved to [LOCATION_2] because he was accepted at a local university. In [DATETIME_2] he met [PERSON_2] and he married her [DATETIME_3] later. At that time he also started working at [ORGANIZATION_1]. He learned a lot in his career as a leader of many project teams. After a while he got a job offer at [ORGANIZATION_2] from [PERSON_3]. A woman he met in his career as a project leader. She saw a big potential in his skills. He decided to take the job and now works as a manager of the technician department.",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Thomas</br><u>Cities:</u> Los Angeles; New York City</br><u>Dates:</u> August 4, 1961; November 1980; 3 years</br><u>Additional persons:</u> Lisa; Jennifer</br><u><u>Employers:</u></u> Microsoft; AT&T",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Lucas</br><u>Cities:</u> Seattle; Tokyo</br><u>Dates:</u> May 7, 1985; June 2010; 1 year</br><u>Additional persons:</u> Ella; Daniel</br><u><u>Employers:</u></u> Canon; JVC",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Nathan</br><u>Cities:</u> San Francisco; Singapore</br><u>Dates:</u> June 13, 1970; August 1995; 10 years</br><u>Additional persons:</u> Juan; Lily</br><u><u>Employers:</u></u> Facebook; Netflix",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Andrew</br><u>Cities:</u> London; Seoul</br><u>Dates:</u> February 20, 1973; January 1996; 11 years</br><u>Additional persons:</u> Noah; Olivia</br><u><u>Employers:</u></u> Yahoo; LG",
            correct: 1
        }
    },
    {
        id: 2,
        category: 0,
        category_str: "Bio",
        original: "Sophia was born on April 15, 1980. She wasn’t a very bright girl, though everybody loved her. She went to Toronto in April 2006 to live with her boyfriend Alexander who wasn’t very smart either. She got a job as a concierge at Blackberry. Even though everybody liked her personality she wasn’t very good at her job, so she got fired. Sophia and Alexander moved to Atlanta because of better job opportunities. After many solicitations she finally got a job as a deliveryman at Amazon. She had a steady income so she tried to have a baby. After 7 years she finally got pregnant. She named her newborn baby Jayden.",
        sner: "[PERSON_1] was born on [DATETIME_1]. She wasn’t a very bright [PERSON_2], though everybody loved her. She went to [LOCATION_1] in [DATETIME_2] to live with her boyfriend [PERSON_3] who wasn’t very smart either. She got a job as a concierge at Blackberry. Even though everybody liked her personality she wasn’t very good at her job, so she got fired. [PERSON_1] and [PERSON_3] moved to [LOCATION_2] because of better job opportunities. After many solicitations she finally got a job as a deliveryman at [LOCATION_3]. She had a steady income so she tried to have a baby. After [DATETIME_3] she finally got pregnant. She named her newborn baby [PERSON_4].",
        ukda: "XXX was born on XXX 15  1980. XXX wasn’t a very bright girl  though everybody loved her. XXX went to XXX in XXX 2006 to live with her boyfriend XXX who wasn’t very smart either. XXX got a job as a concierge at XXX XXX though everybody liked her personality she wasn’t very good at her job  so she got fired. XXX and XXX moved to XXX because of better job opportunities. XXX many solicitations she finally got a job as a deliveryman at XXX XXX had a steady income so she tried to have a baby. XXX 7 years she finally got pregnant. XXX named her newborn baby XXX",
        human: "[PERSON_1] was born on [DATETIME_1]. She wasn’t a very bright girl, though everybody loved her. She went to [LOCATION_1] in [DATETIME_2] to live with her boyfriend [PERSON_2] who wasn’t very smart either. She got a job as a concierge at [ORGANIZATION_1]. Even though everybody liked her personality she wasn’t very good at her job, so she got fired. [PERSON_1] and [PERSON_2] moved to [LOCATION_2] because of better job opportunities. After many applications she finally got a job as a deliveryman at [ORGANIZATION_2]. She had a steady income so she tried to have a baby. After [DATETIME_3] she finally got pregnant. She named her newborn baby [PERSON_3].",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Charlotte</br><u>Cities:</u> Brussels; Kyoto</br><u>Dates:</u> October 1, 1974; November 1994; 16 years</br><u>Additional persons:</u> Madison; Melissa</br><u><u>Employers:</u></u> Google; Nintendo",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Mia</br><u>Cities:</u> Helsinki; Berlin</br><u>Dates:</u> January 28, 1986; February 2001; 2 years</br><u>Additional persons:</u> Ronald; William</br><u><u>Employers:</u></u> Nokia; Siemens",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Sophia</br><u>Cities:</u> Toronto; Atlanta</br><u>Dates:</u> April 15, 1980; April 2006; 7 years</br><u>Additional persons:</u> Jayden; Alexander</br><u><u>Employers:</u></u> BlackBerry; Amazon",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Owen</br><u>Cities:</u> Munich; Copenhagen</br><u>Dates:</u> December 31, 1965; July 1990; 15 years</br><u>Additional persons:</u> Harry; Matthew</br><u><u>Employers:</u></u>Toshiba; Apple",
            correct: 3
        }
    },
    {
        id: 3,
        category: 0,
        category_str: "Bio",
        original: "Isabelle is living in Austin. She originally comes from Barcelona where she was born on July 30, 1979. After her studies she started working for Packard Bell until she moved to Austin in October 2004. She started working at Dell in the marketing department. After 12 years of working at Dell, the manager at her department, Charlie, was going to retire. The upcoming months towards Charlie’s retirement day, she worked hard to prove she was capable to replace Charlie. Unfortunately, Dell chose to hire someone from outside the company, Logan. Accidentally,  knew him from the time she was working at Packard Bell. But back then he was an intern. Isabelle was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        sner: "[PERSON_1] is living in [LOCATION_1]. She originally comes from [LOCATION_2] where she was born on [DATETIME_1]. After her studies she started working for [COMPANY_1] until she moved to [LOCATION_1] in [DATETIME_2]. She started working at [COMPANY_2] in the [COMPANY_3]. After [DATETIME_3] of working at [COMPANY_2], the manager at her department, [PERSON_2], was going to retire. The upcoming [DATETIME_4] towards [PERSON_2]’s retirement [DATETIME_5], she worked hard to prove she was capable to replace [PERSON_2]. Unfortunately, [COMPANY_2] chose to hire [PERSON_4] from outside the company, [LOCATION_3]. Accidentally,  knew him from the time she was working at [COMPANY_1]. But back then he was an intern. [PERSON_1] was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        ukda: "XXX is living in XXX XXX originally comes from XXX where she was born on XXX 30  1979. XXX her studies she started working for XXX XXX until she moved to XXX in XXX 2004. XXX started working at XXX in the marketing department. XXX 12 years of working at XXX the manager at her department  XXX was going to retire. XXX upcoming months towards XXX retirement day  she worked hard to prove she was capable to replace XXX XXX XXX chose to hire someone from outside the company  XXX XXX knew him from the time she was working at XXX XXX XXX back then he was an intern. XXX was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        human: "[PERSON_1] is living in [LOCATION_1]. She originally comes from [LOCATION_2] where she was born on [DATETIME_1]. After her studies she started working for [ORGANIZATION_1] until she moved to [LOCATION_1] in [DATETIME_2]. She started working at [ORGANIZATION_2] in the marketing department. After [DATETIME_3] of working at [ORGANIZATION_2], the manager at her department, [PERSON_2], was going to retire. The upcoming months towards [PERSON_2]’s retirement day, she worked hard to prove she was capable to replace [PERSON_2]. Unfortunately, [ORGANIZATION_2] chose to hire someone from outside the company, [PERSON_3]. Accidentally, [PERSON_1] knew him from the time she was working at [ORGANIZATION_1]. But back then he was an intern. [PERSON_1] was amazed by the news and didn’t know whether to quit the job or cope with this disappointment.",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Isabelle</br><u>Cities:</u> Austin; Barcelona</br><u>Dates:</u> July 30, 1979; October 2004; 12 years</br><u>Additional persons:</u> Logan; Charlie</br><u><u>Employers:</u></u> Dell; Packard Bell",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Edward</br><u>Cities:</u> Chicago; Dallas</br><u>Dates:</u> November 4, 1982; September 1996; 6 years</br><u>Additional persons:</u> Ava; Sophie</br><u><u>Employers:</u></u> eBay; Panasonic",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> James</br><u>Cities:</u> Dubai; Kuala Lumpur</br><u>Dates:</u> July 17, 1984; May 2007; 9 years</br><u>Additional persons:</u> Benjamin; Aiden</br><u><u>Employers:</u></u> Twitter; YouTube",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Abigail</br><u>Cities:</u> Beijing; Shanghai</br><u>Dates:</u> September 16, 1980; September 2003; 13 years</br><u>Additional persons:</u> Emma; Jacob</br><u><u>Employers:</u></u> Samsung; HTC",
            correct: 1
        }
    },
    {
        id: 4,
        category: 1,
        category_str: "Travel",
        original: "It was a cold rainy day in December 2016 when Daniel departed by train from London. He was curious how the reunion between him and Harry was going to be like. One week ago, Daniel and Harry left each other when they were in Manchester. They had a fight over their friend Peter who had been trying to drive them apart during a sleepover at his place in Liverpool. Because a holiday break was coming soon and they would be spending time together, Harry and Daniel had decided to meet up. Two days earlier they talked on the phone to talk things over. They would meet in Leeds so they could start their friendship with a clean slate in the holiday that was coming.",
        sner: "It was a cold rainy [DATETIME_1] when [PERSON_1] departed by train from [LOCATION_1]. He was curious how the reunion between him and [PERSON_2] was going to be like. [DATETIME_3], [PERSON_1] and [PERSON_2] left each other when they were in [LOCATION_2]. They had a fight over their friend [PERSON_3] who had been trying to drive them apart during a sleepover at his place in [LOCATION_3]. Because a holiday break was coming soon and they would be spending time together, [PERSON_2] and [PERSON_1] had decided to meet up. [DATETIME_4] earlier they talked on the phone to talk things over. They would meet in [LOCATION_4] so they could start their friendship with a clean slate in the holiday that was coming.",
        ukda: "XXX was a cold rainy day in XXX 2016 when XXX departed by train from XXX XXX was curious how the reunion between him and XXX was going to be like. XXX week ago  XXX and XXX left each other when they were in XXX XXX had a fight over their friend XXX who had been trying to drive them apart during a sleepover at his place in XXX XXX a holiday break was coming soon and they would be spending time together  XXX and XXX had decided to meet up. XXX days earlier they talked on the phone to talk things over. XXX would meet in XXX so they could start their friendship with a clean slate in the holiday that was coming.",
        human: "It was a cold rainy day in [DATETIME_1] when [PERSON_1] departed by train from [LOCATION_1]. He was curious how the reunion between him and [PERSON_2] was going to be like. [DATETIME_2] ago, [PERSON_1] and [PERSON_2] left each other when they were in [LOCATION_2]. They had a fight over their friend [PERSON_3] who had been trying to drive them apart during a sleepover at his place in [LOCATION_3]. Because a holiday break was coming soon and they would be spending time together, [PERSON_2] and [PERSON_1] had decided to meet up. [DATETIME_3] earlier they talked on the phone to talk things over. They would meet in [LOCATION_4] so they could start their friendship with a clean slate in the holiday that was coming.",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Daniel; Harry</br><u>Cities:</u> London; Manchester; Liverpool; Leeds</br><u>Dates:</u> December 2016; 1 week; 2 days</br><u>Additional persons:</u> Peter",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Fred; Ronald</br><u>Cities:</u> Paris; Bordeaux; Montpellier; Marseille</br><u>Dates:</u> August 2014; 5 weeks; 4 days</br><u>Additional persons:</u> Julie",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Mary; James</br><u>Cities:</u> Malaga; Rabat; Casablanca; Marrakesh</br><u>Dates:</u> June 2012; 2 weeks; 8 days</br><u>Additional persons:</u> Edward",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Elizabeth; Andrew</br><u>Cities:</u> Oslo; Stockholm; Gothenburg; Copenhagen</br><u>Dates:</u> September 2016; 1 month; 5 days</br><u>Additional persons:</u> John",
            correct: 1
        }
    },
    {
        id: 5,
        category: 1,
        category_str: "Travel",
        original: "Charlotte and Matthew were in the final stage of their trip. They had 15 weeks in total but had to catch their flight from Buenos Aires in 16 days. They had been seeing Brasilia and Salvador already and did not plan to visit other cities for a longer period of time. But they were out of money when they got to Sao Paulo and things got different. Owen, the owner of the hotel where they had been staying would not let them leave before they paid everything. He kept their passports until they had been doing the dishes for long enough to pay for their bill. It was not before October 2013 that Charlotte and Matthew could finally leave, but they were too late already to catch their flight home.",
        sner: "[LOCATION_1] and [PERSON_1] were in the final stage of their trip. They had [DATETIME_1] in total but had to catch their flight from [COMPANY_1] in [DATETIME_2]. They had been seeing [LOCATION_2] and [PERSON_2] already and did not plan to visit other cities for a longer period of time. But they were out of money when they got to [LOCATION_3] and things got different. [PERSON_3], the owner of the hotel where they had been staying would not let them leave before they paid everything. He kept their passports until they had been doing the dishes for long enough to pay for their [PERSON_4]. It was not before [DATETIME_3] that [LOCATION_1] and [PERSON_1] could finally leave, but they were too late already to catch their flight home.",
        ukda: "XXX and XXX were in the final stage of their trip. XXX had 15 weeks in total but had to catch their flight from XXX XXX in 16 days. XXX had been seeing XXX and XXX already and did not plan to visit other cities for a longer period of time. XXX they were out of money when they got to XXX XXX and things got different. XXX the owner of the hotel where they had been staying would not let them leave before they paid everything. XXX kept their passports until they had been doing the dishes for long enough to pay for their bill. XXX was not before XXX 2013 that XXX and XXX could finally leave  but they were too late already to catch their flight home.",
        human: "[PERSON_1] and [PERSON_2] were in the final stage of their trip. They had [DATETIME_1] in total but had to catch their flight from [LOCATION_1] in  [DATETIME_2]. They had been seeing [LOCATION_2] and [LOCATION_3] already and did not plan to visit other cities for a longer period of time. But they were out of money when they got to [LOCATION_4] and things got different. [PERSON_3], the owner of the hotel where they had been staying would not let them leave before they paid everything. He kept their passports until they had been doing the dishes for long enough to pay for their bill. It was not before  [DATETIME_3] that [PERSON_1] and [PERSON_2] could finally leave, but they were too late already to catch their flight home.",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Emily; Ava</br><u>Cities:</u> Bologna; Florence; Rome; Naples</br><u>Dates:</u> July 2014; 7 weeks; 11 days</br><u>Additional persons:</u> Jack",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Olivia; Muhammad</br><u>Cities:</u> Bilbao; Barcelona; Madrid; Valencia</br><u>Dates:</u> September 2012; 3 weeks; 6 days</br><u>Additional persons:</u> Juan",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Charlie; Noah</br><u>Cities:</u> Geneva; Zurich; Bern; Milan</br><u>Dates:</u> December 2016; 4 weeks; 7 days</br><u>Additional persons:</u> Amelia",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Matthew; Charlotte</br><u>Cities:</u> Brasilia; Salvador; Sao Paulo; Buenos Aires</br><u>Dates:</u> October 2013; 15 weeks; 16 days</br><u>Additional persons:</u> Owen",
            correct: 4
        }
    },
    {
        id: 6,
        category: 1,
        category_str: "Travel",
        original: "Lily and Sophia wanted to go on a holiday in June 2014. The trip of Lily and Sophia started in Porto. The cathedral looked like the one in Lisbon, where they had been before. For the next 21 days, they were going to Faro as well. Albufeira was planned for the last 10 days of their trip, where they would meet Ethan. Ethan is the boyfriend of Lily and works in Albufeira as a bartender. Albufeira is a city that never sleeps, they heard. So after those days full of exploring, walking and culture they were looking forward to dance. At the end of the holiday they thought happily about the trip. They want to go to on a holiday together again.",
        sner: "[PERSON_1] and [PERSON_2] wanted to go on a holiday in [DATETIME_1]. The trip of [PERSON_1] and [PERSON_2] started in [LOCATION_1]. The cathedral looked like the [NUMBER_1] in [LOCATION_2], where they had been before. For the next 21 [DATETIME_2], they were going to Faro as well. [LOCATION_3] was planned for the last 10 [DATETIME_2] of their trip, where they would meet [PERSON_3]. [PERSON_3] is the boyfriend of [PERSON_1] and works in [LOCATION_3] as a bartender. [LOCATION_3] is a city that never sleeps, they heard. So after those [DATETIME_2] full of exploring, walking and culture they were looking forward to dance. At the end of the holiday they thought happily about the trip. They want to go to on a holiday together again.",
        ukda: "XXX and XXX wanted to go on a holiday in XXX 2014. XXX trip of XXX and XXX started in XXX XXX cathedral looked like the one in XXX where they had been before. XXX the next 21 days  they were going to XXX as well. XXX was planned for the last 10 days of their trip  where they would meet XXX XXX is the boyfriend of XXX and works in XXX as a bartender. XXX is a city that never sleeps  they heard. XXX after those days full of exploring  walking and culture they were looking forward to dance. XXX the end of the holiday they thought happily about the trip. XXX want to go to on a holiday together again.",
        human: "[PERSON_1] and [PERSON_2] wanted to go on a holiday in [DATETIME_1]. The trip of [PERSON_1] and [PERSON_2] started in [LOCATION_1]. The cathedral looked like the one in [LOCATION_2], where they had been before. For the next [DATETIME_2], they were going to [LOCATION_3] as well. [LOCATION_4] was planned for the last [DATETIME_3] of their trip, where they would meet [PERSON_3]. [PERSON_3] is the boyfriend of [PERSON_1] and works in [LOCATION_4] as a bartender. [LOCATION_4] is a city that never sleeps, they heard. So after those days full of exploring, walking and culture they were looking forward to dance. At the end of the holiday they thought happily about the trip. They want to go to on a holiday together again.",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Lily; Sophia</br><u>Cities:</u> Porto; Lisbon; Faro; Albufeira</br><u>Dates:</u> June 2014; 21 days; 10 days</br><u>Additional persons:</u> Ethan",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Isabelle; Lauren</br><u>Cities:</u> Stuttgart; Munich; Salzburg; Vienna</br><u>Dates:</u> June 2015; 17 days; 9 days</br><u>Additional persons:</u> Henry",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Emma; Zoe</br><u>Cities:</u> Mumbai; Jaipur; New Delhi; Kathmandu</br><u>Dates:</u> May 2015; 4 months; 9 weeks</br><u>Additional persons:</u> Aiden",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> Mia; Madison</br><u>Cities:</u> Bangkok; Phnom Penh; Ho Chi Minh City; Hanoi</br><u>Dates:</u> January 2013; 5 months; 11 weeks; 12 days</br><u>Additional persons:</u> Lucas",
            correct: 1
        }
    },
    {
        id: 7,
        category: 1,
        category_str: "Travel",
        original: "Jacob and Melissa have been friends since high school. In July 2015 they were traveling together for 6 weeks. This was their dream since they had been kids. They then began the trip in Quito and went to Lima, Cuzco and Santiago. Along the way they have occasionally been unlucky. For instance, Melissa lost her debit card the when they arrived in Quito and 3 days later Jacob tore his ankle during a hike to a waterfall. Nevertheless they could laugh about it. During the trip they met Nathan. They became friends and he joined them. Besides that it was very nice, it also gave benefits. They could rent a car and they did. It was the best time of their lives.",
        sner: "[PERSON_1] and [PERSON_2] have been friends since high school. In [DATETIME_1] they were traveling together for [DATETIME_2]. This was their dream since they had been kids. They then began the trip in [LOCATION_1] and went to [LOCATION_2], [LOCATION_3] and [LOCATION_4]. Along the way they have occasionally been unlucky. For instance, [PERSON_2] lost her debit card the when they arrived in [LOCATION_1] and [DATETIME_3] later [PERSON_1] tore his ankle during a hike to a waterfall. Nevertheless they could laugh about it. During the trip they met [PERSON_3]. They became friends and he joined them. Besides that it was very nice, it also gave benefits. They could rent a car and they did. It was the best time of their lives.",
        ukda: "XXX and XXX have been friends since high school. XXX XXX 2015 they were traveling together for 6 weeks. XXX was their dream since they had been kids. XXX then began the trip in XXX and went to XXX XXX and XXX XXX the way they have occasionally been unlucky. XXX instance  XXX lost her debit card the when they arrived in XXX and 3 days later XXX tore his ankle during a hike to a waterfall. XXX they could laugh about it. XXX the trip they met XXX XXX became friends and he joined them. XXX that it was very nice  it also gave benefits. XXX could rent a car and they did. XXX was the best time of their lives.",
        human: "[PERSON_1] and [PERSON_2] have been friends since high school. In [DATETIME_1] they were traveling together for [DATETIME_2]. This was their dream since they had been kids. They then began the trip in [LOCATION_1] and went to [LOCATION_2], [LOCATION_3] and [LOCATION_4]. Along the way they have occasionally been unlucky. For instance, [PERSON_2] lost her debit card the when they arrived in [LOCATION_1] and [DATETIME_3] later [PERSON_1] tore his ankle during a hike to a waterfall. Nevertheless they could laugh about it. During the trip they met [PERSON_3]. They became friends and he joined them. Besides that it was very nice, it also gave benefits. They could rent a car and they did. It was the best time of their lives.",
        choices: {
            choice1: "<center>SCENARIO 1</center></br></br><u>Main persons:</u> Ella; Abigail</br><u>Cities:</u> Taipei; Hong Kong; Shanghai; Beijing</br><u>Dates:</u> April 2013; 3 months; 13 days</br><u>Additional persons:</u> Jayden",
            choice2: "<center>SCENARIO 2</center></br></br><u>Main persons:</u> Jacob; Melissa</br><u>Cities:</u> Quito; Cuzco; Lima; Santiago</br><u>Dates:</u> July 2015; 6 weeks; 3 days</br><u>Additional persons:</u> Nathan",
            choice3: "<center>SCENARIO 3</center></br></br><u>Main persons:</u> Logan; Benjamin</br><u>Cities:</u> Brisbane; Sydney; Melbourne; Perth</br><u>Dates:</u> July 2012; 6 months; 14 days</br><u>Additional persons:</u> Hannah",
            choice4: "<center>SCENARIO 4</center></br></br><u>Main persons:</u> William; Michael</br><u>Cities:</u> Panama City; Medellín; Bogotá; Caracas</br><u>Dates:</u> August 2012; 14 weeks; 15 days</br><u>Additional persons:</u> Alexander",
            correct: 2
        }
    }
];
