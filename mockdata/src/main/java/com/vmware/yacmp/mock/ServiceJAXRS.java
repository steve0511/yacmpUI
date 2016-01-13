package com.vmware.yacmp.mock;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Path("/catalog")
public class ServiceJAXRS {

  DatasRepository datas = new DatasRepository();


  @Path("/page")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Page<Catalog> getAll( //
      @QueryParam("sort") String sort, //
      @QueryParam("page") Integer page, //
      @QueryParam("size") Integer size) {
    Pageable pageRequest = new PageRequest( //
        ((page == null) ? 0 : (page - 1)), //
        ((size == null) ? 10 : size));
    return datas.findAll(pageRequest);
  }

  @Path("/name")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Catalog get( //
                               @QueryParam("name") String name) {
     System.out.println("name is"+name);
     SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
     if(!name.equals("")&&!(name==null)){
         return new Catalog(name, name+"create for test for view", formatter.format(new Date()));
     }
     return null;
  }

  // MODEL
  static class Catalog implements Serializable {
    private static final long serialVersionUID = 9167120287441116359L;
    public String name;
    public String description;
    public String createDate;

    public Catalog() {

    }

    public Catalog(String name, String description, String createDate) {
      super();
      this.name = name;
      this.description = description;
      this.createDate = createDate;
    }
  }

}