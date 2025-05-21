import { useState } from "react";
import MediaStructure from "@/components/mediaStructure/MediaStructure";
import { pageTexts } from "@/data/pageTexts";
import { statisticData } from "@/data/statisticData";
import StatsModalWrapper from "@/components/modal/stats/StatsModalWrapper";

const Statistics = () => {
  const text = pageTexts.Statistics;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <MediaStructure
      texts={{
        title: text.name,
        add: text.add,
        image: text.image,
        name: text.title,
        page: text.page,
        regDate: text.regDate,
        action: text.action,
      }}
      data={statisticData}
      onAddClick={() => setModalOpen(true)} // Modalni faqat ochish
    >
      <StatsModalWrapper
        isOpen={modalOpen}
        handleOpen={() => setModalOpen(false)}
        onSubmit={() => {}} // Bo‘sh funksiya, chunki kerak emas
      />
    </MediaStructure>
  );
};

export default Statistics;
