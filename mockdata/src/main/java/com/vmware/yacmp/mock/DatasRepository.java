package com.vmware.yacmp.mock;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.vmware.yacmp.mock.ServiceJAXRS.Catalog;


public class DatasRepository implements PagingAndSortingRepository<Catalog, Serializable> {

	// MOCK
	static List<Catalog> datas;
	
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	
	static {
		datas = new ArrayList<>();
		for (int i = 0; i < 5000; i++) {
			datas.add(new Catalog("Steve", "Steve create for test", formatter.format(new Date())));
			i++;
			datas.add(new Catalog("Grisson", "Grisson create for test", formatter.format(new Date(System.currentTimeMillis()-1000))));
			i++;
			datas.add(new Catalog("Joey", "Joey create for test", formatter.format(new Date(System.currentTimeMillis()-2000))));
			i++;
			datas.add(new Catalog("Rissy", "Rissy create for test", formatter.format(new Date(System.currentTimeMillis()-3000))));
		}
	}

	@Override
	public Page<Catalog> findAll(Pageable arg0) {
		int pSize = arg0.getPageSize();
		int pNumb = arg0.getPageNumber();
		int pFirst = pNumb * pSize;
		int pLast = pFirst + pSize;
		int total = datas.size();
		List<Catalog> content = new ArrayList<>();
		for (int i = 0; i < total; i++) {
			if (i >= pFirst && i < pLast) {
				Catalog data = datas.get(i);
				content.add(data);
			}
		}
		return new PageImpl<>(content, arg0, total);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void delete(Serializable arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Catalog arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Iterable<? extends Catalog> arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean exists(Serializable arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Iterable<Catalog> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Iterable<Catalog> findAll(Iterable<Serializable> arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Catalog findOne(Serializable arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Catalog> S save(S arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends Catalog> Iterable<S> save(Iterable<S> arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Iterable<Catalog> findAll(Sort arg0) {
		// TODO Auto-generated method stub
		return null;
	}

}
