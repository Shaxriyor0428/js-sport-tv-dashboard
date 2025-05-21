import MediaStructure from "@/components/mediaStructure/MediaStructure";
import { useState } from "react";
import PartnersModalWrapper from "@/components/modal/partners/PartnersModalWrapper";
import { pageTexts } from "@/data/pageTexts";
import { partnersData } from "@/data/partnersData";

const Partners = () => {
  const text = pageTexts.Partners;
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
      data={partnersData}
      onAddClick={() => setModalOpen(true)}
    >
      <PartnersModalWrapper
        isOpen={modalOpen}
        handleOpen={() => setModalOpen(false)}
      />
    </MediaStructure>
  );
};

export default Partners;
