package com.stackroute.graphservice.consumer;

import com.stackroute.graphservice.model.Donor;
import com.stackroute.graphservice.rabbitmqconfig.MessageConfig;
import com.stackroute.graphservice.repository.DonorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DonorRequestConsumer {

    private DonorRepository donorRepository;

    @Autowired
    public DonorRequestConsumer(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }
        @RabbitListener(queues = MessageConfig.QUEUE)
      public void consumeMessageFromQueue(Donor donor) {
        donorRepository.save(donor);
        log.info("Message recieved from queue : "+ donor);

    }
}
